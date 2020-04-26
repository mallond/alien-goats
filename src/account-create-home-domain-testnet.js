var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

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
var issuerSecret = 'SCXTST6BXZA6LEMSIPVF2TNBPCBKCHAVNY4MFJE47YJANJSPLA7COEBF'
var issuerPublicKey = 'GCNX7YXURGMFUXX7CSAIVJ7TVP6N7TKZY2YMJ52ERSL6MVJWDIQS4ZLV'
var issuingKeys = StellarSdk.Keypair.fromSecret(issuerSecret);

server.loadAccount(issuerPublicKey)
    .then(function(issuer) {
        var transaction = new StellarSdk.TransactionBuilder(issuer, {
                fee: 100,
                networkPassphrase: StellarSdk.Networks.TESTNET
            })
            .addOperation(StellarSdk.Operation.setOptions({
                homeDomain: 'www.google.com',
            }))
            // setTimeout is required for a transaction
            .setTimeout(100)
            .build();
        transaction.sign(issuingKeys);
        return server.submitTransaction(transaction);
    })
    .then(console.log)
    .catch(function(error) {
        console.error('Error!', error);
    });