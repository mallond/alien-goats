#!/usr/bin/env node

const { execSync } = require('node:child_process');

const assetCode = process.env.ALIENGOAT_ASSET_CODE || 'ALIENGOAT';
const trustMemoText = process.env.ALIENGOAT_TEST_TRUST_MEMO_TEXT || 'E2E trust memo';
const mintMemoHash = (process.env.ALIENGOAT_TEST_MINT_MEMO_HASH || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef').toLowerCase();
const runSoroban = process.env.ALIENGOAT_E2E_SOROBAN === '1';

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
}

function hasCmd(cmd) {
  try {
    execSync(`command -v ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function extract(label, text) {
  const m = text.match(new RegExp(`^${label}=(.+)$`, 'm'));
  return m ? m[1].trim() : null;
}

try {
  console.log(`Running setup smoke test for asset ${assetCode}...`);
  console.log(`Trust memo text: ${trustMemoText}`);
  console.log(`Mint memo hash: ${mintMemoHash}`);
  const setupOut = run(`node src/cli.js setup --asset-code ${assetCode} --mint-amount 7 --trust-memo-text "${trustMemoText}" --mint-memo-hash ${mintMemoHash}`);

  const holderPublic = extract('HOLDER_PUBLIC', setupOut);
  const issuerPublic = extract('ISSUER_PUBLIC', setupOut);

  if (!holderPublic || !issuerPublic) {
    console.error(setupOut);
    throw new Error('Could not parse setup output (HOLDER_PUBLIC/ISSUER_PUBLIC missing).');
  }

  console.log(`Holder: ${holderPublic}`);
  console.log('Checking balance...');

  const balOut = run(`node src/cli.js balance --public-key ${holderPublic}`);

  const hasAsset = balOut.includes(`${assetCode}:${issuerPublic}`) && balOut.includes('7.0000000');
  if (!hasAsset) {
    console.error(balOut);
    throw new Error(`Balance output did not contain expected minted ${assetCode} amount.`);
  }

  if (runSoroban) {
    console.log('Running optional Soroban deploy/init smoke step...');

    if (!hasCmd('stellar')) {
      throw new Error('ALIENGOAT_E2E_SOROBAN=1 but `stellar` CLI is not installed.');
    }

    const source = process.env.ALIENGOAT_SOROBAN_SOURCE || 'admin';
    const network = process.env.ALIENGOAT_SOROBAN_NETWORK || 'testnet';
    const maxPerReward = process.env.ALIENGOAT_SOROBAN_MAX_PER_REWARD || '10';
    const tokenId = process.env.ALIENGOAT_SOROBAN_TOKEN_ID;

    const adminAddress = process.env.ALIENGOAT_SOROBAN_ADMIN_ADDRESS || run(`stellar keys address ${source}`);

    if (!tokenId) {
      throw new Error('Missing ALIENGOAT_SOROBAN_TOKEN_ID for Soroban e2e step.');
    }

    const sorobanOut = run(
      `NETWORK=${network} SOURCE=${source} ADMIN_ADDRESS=${adminAddress} TOKEN_ID=${tokenId} MAX_PER_REWARD=${maxPerReward} ./scripts/soroban-deploy.sh`
    );

    console.log('Soroban deploy/init output:');
    console.log(sorobanOut);
  }

  console.log('✅ e2e smoke test passed');
  console.log(`TRUST_MEMO_TEXT=${trustMemoText}`);
  console.log(`MINT_MEMO_HASH=${mintMemoHash}`);
  console.log(balOut);
} catch (err) {
  console.error(`❌ e2e smoke test failed: ${err.message || err}`);
  process.exit(1);
}
