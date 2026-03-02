#!/usr/bin/env node

const dotenv = require('dotenv');
const StellarSdk = require('@stellar/stellar-sdk');

dotenv.config();

const DEFAULT_HORIZON = process.env.ALIENGOAT_HORIZON || 'https://horizon-testnet.stellar.org';
const DEFAULT_ASSET_CODE = process.env.ALIENGOAT_ASSET_CODE || 'ALIENGOAT';

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
  return fallback;
}

function required(value, message) {
  if (!value) {
    throw new Error(message);
  }
  return value;
}

function keypairFromSecret(secret, label) {
  try {
    return StellarSdk.Keypair.fromSecret(secret);
  } catch {
    throw new Error(`Invalid ${label} secret key`);
  }
}

async function loadAccount(server, publicKey) {
  return server.loadAccount(publicKey);
}

async function submitTx(server, sourceKeypair, buildOps, memo = 'ALIENGOAT cleanup') {
  const source = await loadAccount(server, sourceKeypair.publicKey());
  const fee = await server.fetchBaseFee();

  const tx = buildOps(
    new StellarSdk.TransactionBuilder(source, {
      fee: String(fee),
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
  )
    .addMemo(StellarSdk.Memo.text(memo.slice(0, 28)))
    .setTimeout(60)
    .build();

  tx.sign(sourceKeypair);
  return server.submitTransaction(tx);
}

async function main() {
  const horizon = arg('horizon', DEFAULT_HORIZON);
  const assetCode = arg('asset-code', DEFAULT_ASSET_CODE);

  const issuerSecret = required(
    arg('issuer-secret', process.env.ALIENGOAT_ISSUER_SECRET),
    'Missing issuer secret (--issuer-secret or ALIENGOAT_ISSUER_SECRET)'
  );
  const holderSecret = required(
    arg('holder-secret', process.env.ALIENGOAT_HOLDER_SECRET),
    'Missing holder secret (--holder-secret or ALIENGOAT_HOLDER_SECRET)'
  );

  const issuer = keypairFromSecret(issuerSecret, 'issuer');
  const holder = keypairFromSecret(holderSecret, 'holder');

  const server = new StellarSdk.Horizon.Server(horizon);
  const asset = new StellarSdk.Asset(assetCode, issuer.publicKey());

  const holderAccount = await loadAccount(server, holder.publicKey());
  const trustBalance = holderAccount.balances.find(
    (b) => b.asset_code === assetCode && b.asset_issuer === issuer.publicKey()
  );

  if (trustBalance && Number(trustBalance.balance) > 0) {
    console.log(`Sending ${trustBalance.balance} ${assetCode} back to issuer...`);
    const payResult = await submitTx(
      server,
      holder,
      (tx) =>
        tx.addOperation(
          StellarSdk.Operation.payment({
            destination: issuer.publicKey(),
            asset,
            amount: trustBalance.balance,
          })
        ),
      `${assetCode} return`
    );
    console.log(`RETURN_TX=${payResult.hash}`);
  } else {
    console.log(`No ${assetCode} balance found on holder.`);
  }

  console.log('Removing trustline...');
  const trustResult = await submitTx(
    server,
    holder,
    (tx) =>
      tx.addOperation(
        StellarSdk.Operation.changeTrust({
          asset,
          limit: '0',
        })
      ),
    `${assetCode} rm trust`
  );
  console.log(`TRUST_REMOVE_TX=${trustResult.hash}`);

  console.log('Merging holder account into issuer...');
  const mergeResult = await submitTx(
    server,
    holder,
    (tx) => tx.addOperation(StellarSdk.Operation.accountMerge({ destination: issuer.publicKey() })),
    `${assetCode} acct merge`
  );
  console.log(`MERGE_TX=${mergeResult.hash}`);

  console.log('✅ Cleanup complete');
}

main().catch((err) => {
  console.error(`❌ Cleanup failed: ${err.message || err}`);
  process.exit(1);
});
