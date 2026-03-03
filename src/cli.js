#!/usr/bin/env node

const { Command } = require('commander');
const StellarSdk = require('@stellar/stellar-sdk');
const dotenv = require('dotenv');

dotenv.config();

const DEFAULT_ASSET_CODE = process.env.ALIENGOAT_ASSET_CODE || 'ALIENGOAT';

const NETWORKS = {
  testnet: {
    passphrase: StellarSdk.Networks.TESTNET,
    horizon: process.env.ALIENGOAT_TESTNET_HORIZON || 'https://horizon-testnet.stellar.org',
    friendbot: process.env.ALIENGOAT_FRIENDBOT || 'https://friendbot.stellar.org',
  },
  mainnet: {
    passphrase: StellarSdk.Networks.PUBLIC,
    horizon: process.env.ALIENGOAT_MAINNET_HORIZON || 'https://horizon.stellar.org',
    friendbot: null,
  },
};

function getNetworkConfig(programOptions) {
  const network = programOptions.network || 'testnet';
  const cfg = NETWORKS[network];
  if (!cfg) throw new Error(`Unsupported network: ${network}`);

  return {
    name: network,
    passphrase: cfg.passphrase,
    horizon: programOptions.horizon || cfg.horizon,
    friendbot: programOptions.friendbot || cfg.friendbot,
  };
}

function assertMainnetConfirmed(networkCfg, options) {
  if (networkCfg.name === 'mainnet' && !options.yesMainnet) {
    throw new Error('Mainnet write blocked. Re-run with --yes-mainnet after reviewing values.');
  }
}

function getServer(horizonUrl) {
  return new StellarSdk.Horizon.Server(horizonUrl);
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
  throw new Error(`Missing ${humanName}. Pass via CLI option or set ${envName} in .env`);
}

function assertAmount(value, label) {
  if (!/^(?:0|[1-9]\d*)(?:\.\d{1,7})?$/.test(String(value))) {
    throw new Error(`Invalid ${label}: ${value}. Use positive numeric string with up to 7 decimals.`);
  }
}

async function friendbotFund(friendbotUrl, publicKey) {
  if (!friendbotUrl) {
    throw new Error('Friendbot unavailable on this network. Use testnet for auto-funding.');
  }
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

function parseMemo(options, defaultText) {
  const memoText = options.memoText || options.memo;
  const memoHashHex = options.memoHash;

  if (memoText && memoHashHex) {
    throw new Error('Choose either memo text or memo hash, not both.');
  }

  if (memoHashHex) {
    if (!/^[0-9a-fA-F]{64}$/.test(memoHashHex)) {
      throw new Error('Invalid memo hash. Use exactly 64 hex chars (32 bytes).');
    }
    return StellarSdk.Memo.hash(Buffer.from(memoHashHex, 'hex'));
  }

  const text = memoText || defaultText;
  if (!text) return null;

  if (Buffer.byteLength(text, 'utf8') > 28) {
    throw new Error('Memo text too long. Stellar memo text max is 28 bytes.');
  }
  return StellarSdk.Memo.text(text);
}

async function submitTx(server, networkPassphrase, sourceKeypair, buildOps, memo) {
  const source = await getAccount(server, sourceKeypair.publicKey());
  const fee = await server.fetchBaseFee();

  let txBuilder = new StellarSdk.TransactionBuilder(source, {
    fee: String(fee),
    networkPassphrase,
  });

  txBuilder = buildOps(txBuilder);

  if (memo) {
    txBuilder.addMemo(memo);
  }

  const tx = txBuilder.setTimeout(90).build();
  tx.sign(sourceKeypair);
  return server.submitTransaction(tx);
}

const program = new Command();

program
  .name('alien-goats')
  .description('Mint and manage a Stellar issued asset (testnet + mainnet-safe mode)')
  .version('2.2.0')
  .option('--network <network>', 'testnet | mainnet', process.env.ALIENGOAT_NETWORK || 'testnet')
  .option('--horizon <url>', 'Override Horizon URL')
  .option('--friendbot <url>', 'Override Friendbot URL (testnet only)');

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
  .action(async (options) => {
    const cfg = getNetworkConfig(program.opts());
    if (cfg.name !== 'testnet') throw new Error('fund is testnet-only.');

    const publicKey = requireOptionOrEnv(options.publicKey || options.public, 'ALIENGOAT_PUBLIC', 'public key');
    await friendbotFund(cfg.friendbot, publicKey);
    console.log(`Funded (${cfg.name}): ${publicKey}`);
  });

program
  .command('trust')
  .description('Create/replace trustline to ALIENGOAT asset')
  .option('--holder-secret <secret>', 'Trustline holder secret key')
  .option('--issuer <publicKey>', 'Issuer public key')
  .option('--asset-code <code>', 'Asset code override', DEFAULT_ASSET_CODE)
  .option('--limit <amount>', 'Trustline limit', '5000000000')
  .option('--memo-text <text>', 'Memo text (max 28 bytes)')
  .option('--memo-hash <hex>', 'Memo hash as 32-byte hex (64 hex chars)')
  .option('--memo <text>', 'Legacy alias for --memo-text')
  .option('--yes-mainnet', 'Confirm write ops on mainnet')
  .action(async (options) => {
    const cfg = getNetworkConfig(program.opts());
    assertMainnetConfirmed(cfg, options);
    assertAmount(options.limit, 'trust limit');

    const holderSecret = requireOptionOrEnv(options.holderSecret, 'ALIENGOAT_HOLDER_SECRET', 'holder secret');
    const issuerPublic = requireOptionOrEnv(options.issuer, 'ALIENGOAT_ISSUER_PUBLIC', 'issuer public key');

    const server = getServer(cfg.horizon);
    const holder = keypairFromSecret(holderSecret);
    const asset = new StellarSdk.Asset(options.assetCode, issuerPublic);

    const memo = parseMemo(options, 'ALIENGOAT trustline');

    const result = await submitTx(
      server,
      cfg.passphrase,
      holder,
      (tx) => tx.addOperation(StellarSdk.Operation.changeTrust({ asset, limit: options.limit })),
      memo
    );

    console.log(`[${cfg.name}] Trustline created for ${holder.publicKey()} -> ${options.assetCode}:${issuerPublic}`);
    console.log(`Hash: ${result.hash}`);
  });

program
  .command('mint')
  .description('Mint ALIENGOAT from issuer to destination account')
  .option('--issuer-secret <secret>', 'Issuer secret key')
  .option('--destination <publicKey>', 'Destination public key')
  .option('--amount <amount>', 'Amount to mint, e.g. 1000')
  .option('--asset-code <code>', 'Asset code override', DEFAULT_ASSET_CODE)
  .option('--memo-text <text>', 'Memo text (max 28 bytes)')
  .option('--memo-hash <hex>', 'Memo hash as 32-byte hex (64 hex chars)')
  .option('--memo <text>', 'Legacy alias for --memo-text')
  .option('--yes-mainnet', 'Confirm write ops on mainnet')
  .action(async (options) => {
    const cfg = getNetworkConfig(program.opts());
    assertMainnetConfirmed(cfg, options);

    const issuerSecret = requireOptionOrEnv(options.issuerSecret, 'ALIENGOAT_ISSUER_SECRET', 'issuer secret');
    const destination = requireOptionOrEnv(options.destination, 'ALIENGOAT_DESTINATION', 'destination public key');
    const amount = requireOptionOrEnv(options.amount, 'ALIENGOAT_MINT_AMOUNT', 'mint amount');
    assertAmount(amount, 'mint amount');

    const server = getServer(cfg.horizon);
    const issuer = keypairFromSecret(issuerSecret);

    await getAccount(server, destination);

    const asset = new StellarSdk.Asset(options.assetCode, issuer.publicKey());

    const memo = parseMemo(options, 'ALIENGOAT mint');

    const result = await submitTx(
      server,
      cfg.passphrase,
      issuer,
      (tx) => tx.addOperation(StellarSdk.Operation.payment({ destination, asset, amount: String(amount) })),
      memo
    );

    console.log(`[${cfg.name}] Minted ${amount} ${options.assetCode} to ${destination} from issuer ${issuer.publicKey()}`);
    console.log(`Hash: ${result.hash}`);
  });

program
  .command('lock-issuer')
  .description('Set issuer auth flags (and optionally immutable) for production controls')
  .option('--issuer-secret <secret>', 'Issuer secret key')
  .option('--auth-required', 'Require trustline authorization')
  .option('--auth-revocable', 'Allow trustline revocation')
  .option('--auth-clawback-enabled', 'Enable clawback (must be set before any trustline exists)')
  .option('--make-immutable', 'Set AUTH_IMMUTABLE flag (permanent; cannot be undone)')
  .option('--memo-text <text>', 'Memo text (max 28 bytes)')
  .option('--memo-hash <hex>', 'Memo hash as 32-byte hex (64 hex chars)')
  .option('--memo <text>', 'Legacy alias for --memo-text')
  .option('--yes-mainnet', 'Confirm write ops on mainnet')
  .action(async (options) => {
    const cfg = getNetworkConfig(program.opts());
    assertMainnetConfirmed(cfg, options);

    const issuerSecret = requireOptionOrEnv(options.issuerSecret, 'ALIENGOAT_ISSUER_SECRET', 'issuer secret');
    const issuer = keypairFromSecret(issuerSecret);
    const server = getServer(cfg.horizon);

    const setFlags = [];
    if (options.authRequired) setFlags.push(StellarSdk.AuthRequiredFlag);
    if (options.authRevocable) setFlags.push(StellarSdk.AuthRevocableFlag);
    if (options.authClawbackEnabled) setFlags.push(StellarSdk.AuthClawbackEnabledFlag);
    if (options.makeImmutable) setFlags.push(StellarSdk.AuthImmutableFlag);
    if (setFlags.length === 0) throw new Error('No flags selected. Pass at least one flag option.');

    const memo = parseMemo(options, 'Issuer controls');

    const result = await submitTx(
      server,
      cfg.passphrase,
      issuer,
      (tx) => tx.addOperation(StellarSdk.Operation.setOptions({ setFlags })),
      memo
    );

    console.log(`[${cfg.name}] Issuer flags updated for ${issuer.publicKey()}`);
    console.log(`Flags set: ${setFlags.join(',')}`);
    console.log(`Hash: ${result.hash}`);
  });

program
  .command('setup')
  .description('Create issuer+holder testnet accounts, fund, create trustline, optionally mint')
  .option('--asset-code <code>', 'Asset code override', DEFAULT_ASSET_CODE)
  .option('--trust-limit <amount>', 'Trustline limit', '5000000000')
  .option('--mint-amount <amount>', 'Initial mint amount to send to holder')
  .option('--trust-memo-text <text>', 'Trustline memo text (max 28 bytes)')
  .option('--trust-memo-hash <hex>', 'Trustline memo hash as 32-byte hex (64 hex chars)')
  .option('--mint-memo-text <text>', 'Mint memo text (max 28 bytes)')
  .option('--mint-memo-hash <hex>', 'Mint memo hash as 32-byte hex (64 hex chars)')
  .action(async (options) => {
    const cfg = getNetworkConfig(program.opts());
    if (cfg.name !== 'testnet') throw new Error('setup is testnet-only. For mainnet, create/fund accounts manually.');
    assertAmount(options.trustLimit, 'trust limit');
    if (options.mintAmount) assertAmount(options.mintAmount, 'mint amount');

    const server = getServer(cfg.horizon);
    const issuer = StellarSdk.Keypair.random();
    const holder = StellarSdk.Keypair.random();

    console.log('Creating issuer and holder accounts...');
    await friendbotFund(cfg.friendbot, issuer.publicKey());
    await friendbotFund(cfg.friendbot, holder.publicKey());

    const asset = new StellarSdk.Asset(options.assetCode, issuer.publicKey());

    console.log('Creating trustline on holder account...');
    const trustMemo = parseMemo(
      { memoText: options.trustMemoText, memoHash: options.trustMemoHash },
      `${options.assetCode} trustline`
    );
    const trustResult = await submitTx(
      server,
      cfg.passphrase,
      holder,
      (tx) => tx.addOperation(StellarSdk.Operation.changeTrust({ asset, limit: options.trustLimit })),
      trustMemo
    );

    let mintResult = null;
    if (options.mintAmount) {
      console.log(`Minting ${options.mintAmount} ${options.assetCode} to holder...`);
      const mintMemo = parseMemo(
        { memoText: options.mintMemoText, memoHash: options.mintMemoHash },
        `${options.assetCode} setup mint`
      );
      mintResult = await submitTx(
        server,
        cfg.passphrase,
        issuer,
        (tx) => tx.addOperation(StellarSdk.Operation.payment({ destination: holder.publicKey(), asset, amount: String(options.mintAmount) })),
        mintMemo
      );
    }

    console.log('\n=== Setup Complete ===');
    console.log(`NETWORK=${cfg.name}`);
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
    const cfg = getNetworkConfig(program.opts());
    const publicKey = requireOptionOrEnv(options.publicKey || options.public, 'ALIENGOAT_PUBLIC', 'public key');
    const server = getServer(cfg.horizon);
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
