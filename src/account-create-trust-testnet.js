var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// Keys for accounts to issue and receive the new asset

/**
 * SET SECRET KEYS
 */
var issuingSecretKey = 'SCXTST6BXZA6LEMSIPVF2TNBPCBKCHAVNY4MFJE47YJANJSPLA7COEBF'
var distributingSecretKey = 'SAEVHCYV4YHGH7FEN4MLIIEMM75CATLQGWMYSULRECD4S73I5XBPCOMZ'
var distributingPublicKey = 'GDNZ22AOET3O7JLQPBJMHKK6SQ3HLZQ7TRGUGJF2HITZPPW4TFZK7UI7'

var issuingKeys = StellarSdk.Keypair
    .fromSecret(issuingSecretKey);
// todo: Add distributing compnay secret - trust    
var distributingKeys = StellarSdk.Keypair
    .fromSecret(distributingSecretKey);

// Create an object to represent the new asset
var alienGoat = new StellarSdk.Asset('ALIENGOAT', issuingKeys.publicKey());

// First, the receiving account must trust the asset
server.loadAccount(distributingKeys.publicKey())
    .then(function(receiver) {
        var transaction = new StellarSdk.TransactionBuilder(receiver, {
                fee: 100,
                networkPassphrase: StellarSdk.Networks.TESTNET
            })
            // The `changeTrust` operation creates (or alters) a trustline
            // The `limit` parameter below is optional
            .addOperation(StellarSdk.Operation.changeTrust({
                asset: alienGoat,
                limit: '5000000000'
            }))
            // setTimeout is required for a transaction
            .setTimeout(100)
            .build();
        transaction.sign(distributingKeys);
        return server.submitTransaction(transaction);
    })
    .then(console.log)

// Second, the issuing account actually sends a payment using the asset
.then(function() {
        return server.loadAccount(issuingKeys.publicKey())
    })
    .then(function(issuer) {
        var transaction = new StellarSdk.TransactionBuilder(issuer, {
                fee: 100,
                networkPassphrase: StellarSdk.Networks.TESTNET
            })
            .addOperation(StellarSdk.Operation.payment({
                destination: distributingPublicKey,
                asset: alienGoat,
                amount: '5000000000'
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