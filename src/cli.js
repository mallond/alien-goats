#!/usr/bin/env node

const { Command } = require('commander');
const StellarSdk = require('@stellar/stellar-sdk');

const DEFAULT_HORIZON = 'https://horizon-testnet.stellar.org';
const DEFAULT_FRIENDBOT = 'https://friendbot.stellar.org';
const ASSET_CODE = 'ALIENGOAT';

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
  .version('2.0.0')
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
  .requiredOption('--public <G...>', 'Public key to fund')
  .option('--friendbot <url>', 'Friendbot base URL', DEFAULT_FRIENDBOT)
  .action(async (options) => {
    const url = new URL(options.friendbot);
    url.searchParams.set('addr', options.public);

    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Friendbot request failed: ${res.status} ${body}`);
    }

    console.log(`Funded: ${options.public}`);
  });

program
  .command('trust')
  .description('Create/replace trustline to ALIENGOAT asset')
  .requiredOption('--holder-secret <S...>', 'Trustline holder secret key')
  .requiredOption('--issuer <G...>', 'Issuer public key')
  .option('--limit <amount>', 'Trustline limit', '5000000000')
  .option('--memo <text>', 'Memo text', 'ALIENGOAT trustline')
  .action(async (options) => {
    const server = getServer(program.opts().horizon);
    const holder = keypairFromSecret(options.holderSecret);
    const asset = new StellarSdk.Asset(ASSET_CODE, options.issuer);

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

    console.log(`Trustline created for ${holder.publicKey()} -> ${ASSET_CODE}:${options.issuer}`);
    console.log(`Hash: ${result.hash}`);
  });

program
  .command('mint')
  .description('Mint ALIENGOAT from issuer to destination account')
  .requiredOption('--issuer-secret <S...>', 'Issuer secret key')
  .requiredOption('--destination <G...>', 'Destination public key')
  .requiredOption('--amount <amount>', 'Amount to mint, e.g. 1000')
  .option('--asset-code <code>', 'Asset code override', ASSET_CODE)
  .option('--memo <text>', 'Memo text', 'ALIENGOAT mint')
  .action(async (options) => {
    const server = getServer(program.opts().horizon);
    const issuer = keypairFromSecret(options.issuerSecret);

    await getAccount(server, options.destination);

    const asset = new StellarSdk.Asset(options.assetCode, issuer.publicKey());

    const result = await submitTx(
      server,
      issuer,
      (tx) =>
        tx.addOperation(
          StellarSdk.Operation.payment({
            destination: options.destination,
            asset,
            amount: String(options.amount),
          })
        ),
      options.memo
    );

    console.log(
      `Minted ${options.amount} ${options.assetCode} to ${options.destination} from issuer ${issuer.publicKey()}`
    );
    console.log(`Hash: ${result.hash}`);
  });

program
  .command('balance')
  .description('Show account balances')
  .requiredOption('--public <G...>', 'Public key to inspect')
  .action(async (options) => {
    const server = getServer(program.opts().horizon);
    const account = await getAccount(server, options.public);

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
