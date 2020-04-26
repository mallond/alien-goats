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
var issuerPrivateKey = 'SCXTST6BXZA6LEMSIPVF2TNBPCBKCHAVNY4MFJE47YJANJSPLA7COEBF'
var issuerPublicKey = 'GCNX7YXURGMFUXX7CSAIVJ7TVP6N7TKZY2YMJ52ERSL6MVJWDIQS4ZLV'
var destinationPublicKey = 'GDNZ22AOET3O7JLQPBJMHKK6SQ3HLZQ7TRGUGJF2HITZPPW4TFZK7UI7'

/**
 * Set Value Amount
 */
var valueAmount = '40000000'

var sourceKeys = StellarSdk.Keypair.fromSecret(issuerPrivateKey);
var destinationId = destinationPublicKey;
// Transaction will hold a built transaction we can resubmit if the result is unknown.
var transaction;

// First, check to make sure that the destination account exists.
// You could skip this, but if the account does not exist, you will be charged
// the transaction fee when the transaction fails.
server.loadAccount(destinationId)
    // If the account is not found, surface a nicer error message for logging.
    .catch(function(error) {
        if (error instanceof StellarSdk.NotFoundError) {
            throw new Error('The destination account does not exist!');
        } else return error
    })
    // If there was no error, load up-to-date information on your account.
    .then(function() {
        return server.loadAccount(sourceKeys.publicKey());
    })
    .then(function(sourceAccount) {
        // Start building the transaction.
        transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: StellarSdk.Networks.TESTNET
            })
            .addOperation(StellarSdk.Operation.payment({
                destination: destinationId,
                // Because Stellar allows transaction in many currencies, you must
                // specify the asset type. The special "native" asset represents Lumens.
                asset: new StellarSdk.Asset('ALIENGOAT', issuerPublicKey),
                amount: valueAmount
            }))
            // A memo allows you to add your own metadata to a transaction. It's
            // optional and does not affect how Stellar treats the transaction.
            .addMemo(StellarSdk.Memo.text('Create payment-Alien Goats Rock-n-Roll!'))
            // Wait a maximum of three minutes for the transaction
            .setTimeout(180)
            .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(sourceKeys);
        // And finally, send it off to Stellar!
        return server.submitTransaction(transaction);
    })
    .then(function(result) {
        console.log('Success! Results:', result);
    })
    .catch(function(error) {
        console.error('Something went wrong!', JSON.stringify(error, null, 2));
        // If the result is unknown (no response body, timeout etc.) we simply resubmit
        // already built transaction:
        // server.submitTransaction(transaction);
    });