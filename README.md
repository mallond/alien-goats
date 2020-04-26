# Initial Coin Release - Alien Goat

![aliengoat_20191229](https://user-images.githubusercontent.com/993459/80028765-77534f80-849a-11ea-9fbc-2e1c9d4ed2a9.png)
<img align="center" width="75" height="75" src="https://user-images.githubusercontent.com/993459/80298055-8a397e80-873d-11ea-9b14-d2c6b918265c.png">



```
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
 ```

# Step 1 - Create Accounts
## Acme Issuer Account LLC
```
> node src/account-create-testnet.js
```
```
Secret: SCXTST6BXZA6LEMSIPVF2TNBPCBKCHAVNY4MFJE47YJANJSPLA7COEBF
Public Key: GCNX7YXURGMFUXX7CSAIVJ7TVP6N7TKZY2YMJ52ERSL6MVJWDIQS4ZLV

```

## Acme Product Distribution Company 
```
> node src/account-create-testnet.js
```
```
Secret: SAEVHCYV4YHGH7FEN4MLIIEMM75CATLQGWMYSULRECD4S73I5XBPCOMZ
Public Key: GDNZ22AOET3O7JLQPBJMHKK6SQ3HLZQ7TRGUGJF2HITZPPW4TFZK7UI7
```


## Investor #1 
```
> node src/account-create-testnet.js
```
```
Secret: SCZQN4VLABVXSZ6AZT6YBFVGWQZZCYG6RJHQ7MZ5LMSEEI7TUXSLMKZW
Public Key: GC37N7GSLKMVPCVM77FMC7VYK3IRW4N6ZM52P6BUIVCOAPMJO7IMQP6J
```

## Investor #2
```
> node src/account-create-testnet.js
```
```
Secret: SDN2XILQWX6XPY65D3O3K2ZKDO74K3AIYUS6Q64FD3LV6T3RZVQ65NI4
Public Key: GD2CSVLGY433V4YJXDOSZQL3E5NJ3HN3BSIZW3COPVTEF7NOCI4S7CVB
```


## Investor #3
```
> node src/account-create-testnet.js
```
```
Secret: SBZYC5UNKDBV5TLNY67GVZHM7XQOOPYXQ4W3AR5GHLQ72F43W52QSOQE
Public Key: GB77JOVWMOR3OC2FBVXUYMC6TUHYNZTCYGXPF2DDWNRJDSNBLUPEWKYW
```

# Step 2 - Create Alien Goat Coin and freeze future creation - limited Coin offering

## Create Trust Link - From distribution to the issuer

```
node src/account-create-trust-testnet.js
```
Validate 
```
Distributors Trust Line 

https://horizon-testnet.stellar.org/accounts/GDNZ22AOET3O7JLQPBJMHKK6SQ3HLZQ7TRGUGJF2HITZPPW4TFZK7UI7

...
"balances": [
  "balances": [
    {
      "balance": "1.0000000",
      "limit": "5000000000.0000000",
      "buying_liabilities": "0.0000000",
      "selling_liabilities": "0.0000000",
      "last_modified_ledger": 1388988,
      "is_authorized": true,
      "is_authorized_to_maintain_liabilities": true,
      "asset_type": "credit_alphanum12",
      "asset_code": "ALIENGOAT",
      "asset_issuer": "GCNX7YXURGMFUXX7CSAIVJ7TVP6N7TKZY2YMJ52ERSL6MVJWDIQS4ZLV"
    }
...    
```

## Create The Coins - Issuer payment to Distributor 

> Create the Coins

```
> node src/account-create-payment-testnet.js
```

Verify 
```
https://horizon-testnet.stellar.org/accounts/GDNZ22AOET3O7JLQPBJMHKK6SQ3HLZQ7TRGUGJF2HITZPPW4TFZK7UI7

...
    {
      "balance": "40000001.0000000",
      "limit": "5000000000.0000000",
      "buying_liabilities": "0.0000000",
      "selling_liabilities": "0.0000000",
      "last_modified_ledger": 1389307,
      "is_authorized": true,
      "is_authorized_to_maintain_liabilities": true,
      "asset_type": "credit_alphanum12",
      "asset_code": "ALIENGOAT",
      "asset_issuer": "GCNX7YXURGMFUXX7CSAIVJ7TVP6N7TKZY2YMJ52ERSL6MVJWDIQS4ZLV"
    }
...

```
> Freeze any creation of future coins


 
 # Resources
 - [Stellar Laboratory - Go and explore](https://laboratory.stellar.org/#?network=test)  
 - [Create an ICO on Stellar Network With Custom Token](https://medium.com/@ashisherc/create-an-ico-on-stellar-network-with-custom-token-7b6aab349f33)  
 - [Lumenauts an Unoffical Guide](https://www.lumenauts.com/)  
 - [Embed Tool](http://embedyoutube.org/)

# Learning Vids by [Luemenauts](https://www.lumenauts.com/)

- [![](http://img.youtube.com/vi/Cf9CdFVse-w/0.jpg)](http://www.youtube.com/watch?v=Cf9CdFVse-w "Assets")









