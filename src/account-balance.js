const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');

//const server = new StellarSdk.Server(`https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())});
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
// the JS SDK uses promises for most actions, such as retrieving an account

const fetchAccountBalance = async(publicKey) => {
    const account = await server.loadAccount(publicKey);
    // todo: Replace Pulic Key
    console.log("Balances for account: " + 'GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ');
    account.balances.forEach(function(balance) {
        console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
    })
    return account
}

// todo: Replace public key
const publicKey = 'GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG'
fetchAccountBalance(publicKey).then((result) => {
    //console.log(result)
}).catch((error) => {
    console.log('error:', result)
})