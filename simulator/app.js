const state = {
  stage: 'testnet',
  assetCode: 'ALIENGOAT',
  priceUsd: 0.01,
  accounts: [],
  log: [],
  productionSnapshot: null,
};

const $ = (id) => document.getElementById(id);
const short = (s) => s.slice(0, 6) + '...' + s.slice(-4);
const id = () => 'G' + Math.random().toString(36).slice(2, 14).toUpperCase();

const assetBal = (acct) => acct.balances[state.assetCode] || 0;
const setAssetBal = (acct, amount) => { acct.balances[state.assetCode] = amount; };

function addLog(msg) {
  const ts = new Date().toLocaleTimeString();
  state.log.unshift(`[${ts}] ${msg}`);
  $('log').textContent = state.log.slice(0, 120).join('\n');
}

function createAccount(type) {
  const acct = {
    id: id(),
    type,
    xlm: 100,
    trust: null,
    balances: { XLM: 100 },
  };
  setAssetBal(acct, 0);
  state.accounts.push(acct);
  addLog(`Created ${type} account ${short(acct.id)} in ${state.stage}`);
  render();
}

function getIssuer() { return state.accounts.find(a => a.type === 'issuer'); }
function byId(v) { return state.accounts.find(a => a.id === v); }

function addTrustline(holderId, limit) {
  const issuer = getIssuer();
  const holder = byId(holderId);
  if (!issuer) return alert('Create issuer first');
  if (!holder) return alert('Pick holder');
  holder.trust = { issuer: issuer.id, limit: Number(limit) || 0, assetCode: state.assetCode };
  addLog(`${short(holder.id)} trusted ${state.assetCode} from ${short(issuer.id)} with limit ${limit}`);
  render();
}

function mint(destId, amount) {
  const issuer = getIssuer();
  const holder = byId(destId);
  amount = Number(amount);
  if (!issuer || !holder) return alert('Need issuer + destination');
  if (!holder.trust || holder.trust.issuer !== issuer.id || holder.trust.assetCode !== state.assetCode) return alert('Destination missing trustline');
  if (assetBal(holder) + amount > holder.trust.limit) return alert('Trustline limit exceeded');
  setAssetBal(holder, assetBal(holder) + amount);
  addLog(`Minted ${amount} ${state.assetCode} to ${short(holder.id)}`);
  render();
}

function transfer(fromId, toId, amount) {
  const from = byId(fromId), to = byId(toId);
  amount = Number(amount);
  if (!from || !to || from.id === to.id) return alert('Pick valid from/to');
  if (assetBal(from) < amount) return alert('Insufficient balance');
  if (!to.trust || to.trust.assetCode !== state.assetCode) return alert('Recipient missing trustline');
  if (assetBal(to) + amount > to.trust.limit) return alert('Recipient trustline limit exceeded');
  setAssetBal(from, assetBal(from) - amount);
  setAssetBal(to, assetBal(to) + amount);
  addLog(`Transfer ${amount} ${state.assetCode} from ${short(from.id)} to ${short(to.id)}`);
  render();
}

function promoteToProduction() {
  state.productionSnapshot = JSON.parse(JSON.stringify(state.accounts));
  state.stage = 'production';
  addLog('Promoted current testnet snapshot to production mode');
  $('stage').value = 'production';
  render();
}

function calcSeed() {
  const donation = Number($('donation').value || 0);
  const price = Number($('price').value || 0.01);
  const mult = Number($('multiplier').value || 1);
  const tokens = (donation / price) * mult;
  $('calcOut').textContent = `Seed allocation: ${tokens.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${state.assetCode}`;
}

function marketTick() {
  const drift = (Math.random() * 0.1) - 0.05;
  state.priceUsd = Math.max(0.0001, state.priceUsd * (1 + drift));
  $('price').value = state.priceUsd.toFixed(4);
  addLog(`Market tick: ${state.assetCode}/USD = ${state.priceUsd.toFixed(4)}`);
}

function updateAssetCode(nextCodeRaw) {
  const nextCode = (nextCodeRaw || '').trim().toUpperCase();
  if (!nextCode) return;
  const prev = state.assetCode;
  if (prev === nextCode) return;

  state.assetCode = nextCode;
  for (const a of state.accounts) {
    if (a.balances[nextCode] == null) a.balances[nextCode] = 0;
  }
  addLog(`Asset code changed from ${prev} to ${nextCode}`);
  render();
}

function render() {
  $('stageNote').textContent = state.stage === 'testnet'
    ? 'Testnet mode: free experimentation.'
    : 'Production mode: simulate careful real-value operations.';

  $('accounts').innerHTML = state.accounts.length
    ? state.accounts.map(a => `• ${a.type.toUpperCase()} ${short(a.id)}`).join('<br>')
    : '<em>No accounts yet</em>';

  const opts = state.accounts.map(a => `<option value="${a.id}">${a.type}:${short(a.id)}</option>`).join('');
  ['trustHolder', 'mintTo', 'txFrom', 'txTo'].forEach(id => { $(id).innerHTML = `<option value="">Select...</option>${opts}`; });

  $('balances').innerHTML = state.accounts.length
    ? state.accounts.map(a => `${a.type.toUpperCase()} ${short(a.id)} — XLM: ${a.balances.XLM.toFixed(2)} | ${state.assetCode}: ${assetBal(a).toFixed(2)}${a.trust && a.trust.assetCode === state.assetCode ? ` | TrustLimit:${a.trust.limit}` : ''}`).join('<br>')
    : '<em>No balances yet</em>';
}

$('stage').addEventListener('change', (e) => { state.stage = e.target.value; render(); });
$('assetCode').addEventListener('change', (e) => updateAssetCode(e.target.value));
$('promoteBtn').addEventListener('click', promoteToProduction);
$('createIssuer').addEventListener('click', () => createAccount('issuer'));
$('createHolder').addEventListener('click', () => createAccount('holder'));
$('addTrust').addEventListener('click', () => addTrustline($('trustHolder').value, $('trustLimit').value));
$('mintBtn').addEventListener('click', () => mint($('mintTo').value, $('mintAmount').value));
$('transferBtn').addEventListener('click', () => transfer($('txFrom').value, $('txTo').value, $('txAmount').value));
$('calcBtn').addEventListener('click', calcSeed);
$('tickBtn').addEventListener('click', marketTick);
$('price').addEventListener('input', (e) => { state.priceUsd = Number(e.target.value || 0.01); });

$('assetCode').value = state.assetCode;
render();
addLog('Simulator ready');
