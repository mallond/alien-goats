#!/usr/bin/env node

const { execSync } = require('node:child_process');

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
}

function extract(label, text) {
  const m = text.match(new RegExp(`^${label}=(.+)$`, 'm'));
  return m ? m[1].trim() : null;
}

try {
  console.log('Running setup smoke test...');
  const setupOut = run('node src/cli.js setup --mint-amount 7');

  const holderPublic = extract('HOLDER_PUBLIC', setupOut);
  const issuerPublic = extract('ISSUER_PUBLIC', setupOut);

  if (!holderPublic || !issuerPublic) {
    console.error(setupOut);
    throw new Error('Could not parse setup output (HOLDER_PUBLIC/ISSUER_PUBLIC missing).');
  }

  console.log(`Holder: ${holderPublic}`);
  console.log('Checking balance...');

  const balOut = run(`node src/cli.js balance --public-key ${holderPublic}`);

  const hasAlienGoat = balOut.includes(`ALIENGOAT:${issuerPublic}`) && balOut.includes('7.0000000');
  if (!hasAlienGoat) {
    console.error(balOut);
    throw new Error('Balance output did not contain expected minted ALIENGOAT amount.');
  }

  console.log('✅ e2e smoke test passed');
  console.log(balOut);
} catch (err) {
  console.error(`❌ e2e smoke test failed: ${err.message || err}`);
  process.exit(1);
}
