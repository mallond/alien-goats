const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');

/**
 * SET PUBLIC KEY
 */
const publicKey = 'GBC3SP3S6CZVKIVBSS36EJWUT2H24S744OGF65GRX737STUACXOE5CNW';

//const server = new StellarSdk.Server(`https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())});
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
// the JS SDK uses promises for most actions, such as retrieving an account

const fetchAccountBalance = async(publicKey) => {
    const account = await server.loadAccount(publicKey);
    // todo: Replace Pulic Key
    console.log("Balances for account: " + publicKey);
    account.balances.forEach(function(balance) {
        console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
    })
    return account
}

fetchAccountBalance(publicKey).then((result) => {
    //console.log(result)
}).catch((error) => {
    console.log('error:', result)
})