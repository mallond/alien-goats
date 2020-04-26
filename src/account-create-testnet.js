const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');

const pair = StellarSdk.Keypair.random();

pair.secret();
pair.publicKey();

console.log(`Secret: ${pair.secret()}`)
console.log(`Public Key: ${pair.publicKey()}`)

const main = async() => {
    try {
        const response = await fetch(
            `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
        );
        const responseJSON = await response.json();
        console.log("SUCCESS! You have a new account :)\n", responseJSON);
        return responseJSON;
    } catch (e) {
        console.error("ERROR!", e);
    }
}

main()