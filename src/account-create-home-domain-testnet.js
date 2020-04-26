var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// Keys for issuing account
// Todo: Change the issuing company private keys
// Todo: Add the homedomain or contract details
/**
 * SET SECRETS 
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