var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

var alienGoatCode = 'ALIENGOAT';

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

var AlienGoatIssuer = 'GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ';

// Trust
var trustAccountId = 'GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG';
server.loadAccount(trustAccountId).then(function(account) {
    var trusted = account.balances.some(function(balance) {
        return balance.asset_code === alienGoatCode &&
            balance.asset_issuer === AlienGoatIssuer;
    });

    console.log(trusted ? 'Trusted :)' : 'Not trusted :(');
});