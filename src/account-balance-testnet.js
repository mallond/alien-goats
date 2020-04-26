const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');

/**
 * SET KEYS
 * 
 * Why not put these keys in a config file? 
 * I want you to see the bare essentials, 
 * and that keys are part of this learning activity, 
 * to reinforce, the blockchain model of keys, 
 * both private and public. 
 * 
 * No need to muddle the details while learning. 
 */
const publicKey = 'GCNX7YXURGMFUXX7CSAIVJ7TVP6N7TKZY2YMJ52ERSL6MVJWDIQS4ZLV';

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