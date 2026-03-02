#!/usr/bin/env node

const { Command } = require('commander');
const StellarSdk = require('@stellar/stellar-sdk');
const dotenv = require('dotenv');

dotenv.config();

const DEFAULT_HORIZON = process.env.ALIENGOAT_HORIZON || 'https://horizon-testnet.stellar.org';
const DEFAULT_FRIENDBOT = process.env.ALIENGOAT_FRIENDBOT || 'https://friendbot.stellar.org';
const DEFAULT_ASSET_CODE = process.env.ALIENGOAT_ASSET_CODE || 'ALIENGOAT';

function getServer(horizonUrl) {
  return new StellarSdk.Horizon.Server(horizonUrl || DEFAULT_HORIZON);
}

function keypairFromSecret(secret) {
  try {
    return StellarSdk.Keypair.fromSecret(secret);
  } catch {
    throw new Error('Invalid secret key. It should start with S...');
  }
}

function requireOptionOrEnv(value, envName, humanName) {
  if (value) return value;
  const envValue = process.env[envName];
  if (envValue) return envValue;
  throw new Error(`Missing ${humanName}. Pass it via CLI option or set ${envName} in .env`);
}

async function friendbotFund(friendbotUrl, publicKey) {
  const url = new URL(friendbotUrl);
  url.searchParams.set('addr', publicKey);

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Friendbot request failed for ${publicKey}: ${res.status} ${body}`);
  }
}

async function getAccount(server, publicKey) {
  try {
    return await server.loadAccount(publicKey);
  } catch (err) {
    if (err instanceof StellarSdk.NotFoundError) {
      throw new Error(`Account not found: ${publicKey}`);
    }
    throw err;
  }
}

async function submitTx(server, sourceKeypair, buildOps, memoText) {
  const source = await getAccount(server, sourceKeypair.publicKey());
  const fee = await server.fetchBaseFee();

  let txBuilder = new StellarSdk.TransactionBuilder(source, {
    fee: String(fee),
    networkPassphrase: StellarSdk.Networks.TESTNET,
  });

  txBuilder = buildOps(txBuilder);

  if (memoText) {
    txBuilder.addMemo(StellarSdk.Memo.text(memoText.slice(0, 28)));
  }

  const tx = txBuilder.setTimeout(60).build();
  tx.sign(sourceKeypair);
  return server.submitTransaction(tx);
}

const program = new Command();

program
  .name('alien-goats')
  .description('Mint and manage ALIENGOAT on Stellar testnet')
  .version('2.1.0')
  .option('--horizon <url>', 'Horizon URL', DEFAULT_HORIZON);

program
  .command('keygen')
  .description('Generate a new Stellar keypair')
  .action(() => {
    const kp = StellarSdk.Keypair.random();
    console.log(`Public: ${kp.publicKey()}`);
    console.log(`Secret: ${kp.secret()}`);
  });

program
  .command('fund')
  .description('Fund a testnet account using Friendbot')
  .option('--public-key <publicKey>', 'Public key to fund')
  .option('--public <publicKey>', 'Public key to fund (legacy alias)')
  .option('--friendbot <url>', 'Friendbot base URL', DEFAULT_FRIENDBOT)
  .action(async (options) => {
    const publicKey = requireOptionOrEnv(options.publicKey || options.public, 'ALIENGOAT_PUBLIC', 'public key');
    await friendbotFund(options.friendbot, publicKey);
    console.log(`Funded: ${publicKey}`);
  });

program
  .command('trust')
  .description('Create/replace trustline to ALIENGOAT asset')
  .option('--holder-secret <secret>', 'Trustline holder secret key')
  .option('--issuer <publicKey>', 'Issuer public key')
  .option('--asset-code <code>', 'Asset code override', DEFAULT_ASSET_CODE)
  .option('--limit <amount>', 'Trustline limit', '5000000000')
  .option('--memo <text>', 'Memo text', 'ALIENGOAT trustline')
  .action(async (options) => {
    const holderSecret = requireOptionOrEnv(options.holderSecret, 'ALIENGOAT_HOLDER_SECRET', 'holder secret');
    const issuerPublic = requireOptionOrEnv(options.issuer, 'ALIENGOAT_ISSUER_PUBLIC', 'issuer public key');

    const server = getServer(program.opts().horizon);
    const holder = keypairFromSecret(holderSecret);
    const asset = new StellarSdk.Asset(options.assetCode, issuerPublic);

    const result = await submitTx(
      server,
      holder,
      (tx) =>
        tx.addOperation(
          StellarSdk.Operation.changeTrust({
            asset,
            limit: options.limit,
          })
        ),
      options.memo
    );

    console.log(`Trustline created for ${holder.publicKey()} -> ${options.assetCode}:${issuerPublic}`);
    console.log(`Hash: ${result.hash}`);
  });

program
  .command('mint')
  .description('Mint ALIENGOAT from issuer to destination account')
  .option('--issuer-secret <secret>', 'Issuer secret key')
  .option('--destination <publicKey>', 'Destination public key')
  .option('--amount <amount>', 'Amount to mint, e.g. 1000')
  .option('--asset-code <code>', 'Asset code override', DEFAULT_ASSET_CODE)
  .option('--memo <text>', 'Memo text', 'ALIENGOAT mint')
  .action(async (options) => {
    const issuerSecret = requireOptionOrEnv(options.issuerSecret, 'ALIENGOAT_ISSUER_SECRET', 'issuer secret');
    const destination = requireOptionOrEnv(options.destination, 'ALIENGOAT_DESTINATION', 'destination public key');
    const amount = requireOptionOrEnv(options.amount, 'ALIENGOAT_MINT_AMOUNT', 'mint amount');

    const server = getServer(program.opts().horizon);
    const issuer = keypairFromSecret(issuerSecret);

    await getAccount(server, destination);

    const asset = new StellarSdk.Asset(options.assetCode, issuer.publicKey());

    const result = await submitTx(
      server,
      issuer,
      (tx) =>
        tx.addOperation(
          StellarSdk.Operation.payment({
            destination,
            asset,
            amount: String(amount),
          })
        ),
      options.memo
    );

    console.log(`Minted ${amount} ${options.assetCode} to ${destination} from issuer ${issuer.publicKey()}`);
    console.log(`Hash: ${result.hash}`);
  });

program
  .command('setup')
  .description('Create issuer+holder testnet accounts, fund, create trustline, optionally mint')
  .option('--asset-code <code>', 'Asset code override', DEFAULT_ASSET_CODE)
  .option('--trust-limit <amount>', 'Trustline limit', '5000000000')
  .option('--mint-amount <amount>', 'Initial mint amount to send to holder')
  .option('--friendbot <url>', 'Friendbot base URL', DEFAULT_FRIENDBOT)
  .action(async (options) => {
    const server = getServer(program.opts().horizon);

    const issuer = StellarSdk.Keypair.random();
    const holder = StellarSdk.Keypair.random();

    console.log('Creating issuer and holder accounts...');
    await friendbotFund(options.friendbot, issuer.publicKey());
    await friendbotFund(options.friendbot, holder.publicKey());

    const asset = new StellarSdk.Asset(options.assetCode, issuer.publicKey());

    console.log('Creating trustline on holder account...');
    const trustResult = await submitTx(
      server,
      holder,
      (tx) =>
        tx.addOperation(
          StellarSdk.Operation.changeTrust({
            asset,
            limit: options.trustLimit,
          })
        ),
      `${options.assetCode} trustline`
    );

    let mintResult = null;
    if (options.mintAmount) {
      console.log(`Minting ${options.mintAmount} ${options.assetCode} to holder...`);
      mintResult = await submitTx(
        server,
        issuer,
        (tx) =>
          tx.addOperation(
            StellarSdk.Operation.payment({
              destination: holder.publicKey(),
              asset,
              amount: String(options.mintAmount),
            })
          ),
        `${options.assetCode} setup mint`
      );
    }

    console.log('\n=== Setup Complete ===');
    console.log(`ASSET_CODE=${options.assetCode}`);
    console.log(`ISSUER_PUBLIC=${issuer.publicKey()}`);
    console.log(`ISSUER_SECRET=${issuer.secret()}`);
    console.log(`HOLDER_PUBLIC=${holder.publicKey()}`);
    console.log(`HOLDER_SECRET=${holder.secret()}`);
    console.log(`TRUST_TX=${trustResult.hash}`);
    if (mintResult) {
      console.log(`MINT_TX=${mintResult.hash}`);
      console.log(`MINT_AMOUNT=${options.mintAmount}`);
    }

    console.log('\nAdd these to a .env file if you want to reuse this setup.');
  });

program
  .command('balance')
  .description('Show account balances')
  .option('--public-key <publicKey>', 'Public key to inspect')
  .option('--public <publicKey>', 'Public key to inspect (legacy alias)')
  .action(async (options) => {
    const publicKey = requireOptionOrEnv(options.publicKey || options.public, 'ALIENGOAT_PUBLIC', 'public key');
    const server = getServer(program.opts().horizon);
    const account = await getAccount(server, publicKey);

    for (const b of account.balances) {
      if (b.asset_type === 'native') {
        console.log(`XLM: ${b.balance}`);
      } else {
        console.log(`${b.asset_code}:${b.asset_issuer} = ${b.balance}`);
      }
    }
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
