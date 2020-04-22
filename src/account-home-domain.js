var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// Keys for issuing account
// Todo: Change the issuing company private keys
// Todo: Add the homedomain or contract details
var issuingKeys = StellarSdk.Keypair
    .fromSecret('SBEZ66ZVFSQFSVTU44HRZDFT26XXGYMI7TVCILOOZ5KNZKNUQJ4GO6LC');

server.loadAccount(issuingKeys.publicKey())
    .then(function(issuer) {
        var transaction = new StellarSdk.TransactionBuilder(issuer, {
                fee: 100,
                networkPassphrase: StellarSdk.Networks.TESTNET
            })
            .addOperation(StellarSdk.Operation.setOptions({
                homeDomain: 'https://raw.githubusercontent.com/mallond/alien-goats/master/contracts/logo-digital-asset',
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