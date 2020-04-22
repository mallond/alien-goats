# alien-goats
Alien Goats - Trading in XLM Lumens, based on what feels to be *Alien technology. 

<sub>*Alien : belonging or relating to another person, place, or thing</sub>

## Contracts/Assets

### Alien Goat Digital Asset @copywrite 2019 all rights reserved

![aliengoat_20191229](https://user-images.githubusercontent.com/993459/80028765-77534f80-849a-11ea-9fbc-2e1c9d4ed2a9.png)

# Demonstration - Lumens

>Definition : a unit of luminous flux equal to the light emitted in a unit solid angle by a uniform point source of one candle intensity

## Steps 

> *Key*: The create account is used only for the development environment. There are a few requirments, such as minimal balance deposited with real lumens.

### Step 1 - Create Alien Goat Account

Key: Keep the output confidential and in a secret place. Like not here in Github.

```
> node src/account-create.js > aliengoat-company.txt

```

```
The above command will create the Account details

Secret: SBEZ66ZVFSQFSVTU44HRZDFT26XXGYMI7TVCILOOZ5KNZKNUQJ4GO6LC
Public Key: GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ
SUCCESS! You have a new account :)
 {
  _links: {
    transaction: {
      href: 'https://horizon-testnet.stellar.org/transactions/e234a8e7f4838b98472c09506be4b1cf4d64e2eb238b7af97ed00fb2140ea1d2'
    }
  },
  hash: 'e234a8e7f4838b98472c09506be4b1cf4d64e2eb238b7af97ed00fb2140ea1d2',
  ledger: 1338518,
  envelope_xdr: 'AAAAAFTJl62osn69qUxscof8WWaRCsZjTzV/mM+YgFjHguF2AAGGoAAUFfgAAAAJAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAAAEH3Rayw4M0iCLoEe96rPFNGYim8AVHJU0z4ebYZW4JwAAAAAAAAAAIUWtCKrR1YQhKH0m7GnGXjIIj77pZqy1JdlJvQbNSNsAAAAF0h26AAAAAAAAAAAAseC4XYAAABA1k3HlsD5aey4gc8H8jQigy8PvJ+kJGEEnoXZ09E5nepgTrs8/9jv6J1MozJDOIjE+sWJ5DAZPakJ3o8S9wMjD4ZW4JwAAABA8rYA8Qnmc0u5HW762/tZJeYed/FdwGQgWaZHRSUew7yCXNi0lgjqCIIBVvueFYR4404ZWqMbBT5/pD29q262Dw==',
  result_xdr: 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAA=',
  result_meta_xdr: 'AAAAAQAAAAIAAAADABRslgAAAAAAAAAAVMmXraiyfr2pTGxyh/xZZpEKxmNPNX+Yz5iAWMeC4XYAAAAAPDHWwAAUFfgAAAAIAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABABRslgAAAAAAAAAAVMmXraiyfr2pTGxyh/xZZpEKxmNPNX+Yz5iAWMeC4XYAAAAAPDHWwAAUFfgAAAAJAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAwAAAAMAFGyUAAAAAAAAAAAQfdFrLDgzSIIugR73qs8U0ZiKbwBUclTTPh5thlbgnADjTzUbmND0AAAAvwAAAEEAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAFGyWAAAAAAAAAAAQfdFrLDgzSIIugR73qs8U0ZiKbwBUclTTPh5thlbgnADjTx3TIej0AAAAvwAAAEEAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAFGyWAAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAABdIdugAABRslgAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA=='
}

```

### Step 3 - Create the Trust

Key: Keep the output confidential and in a secret place. Like not here in Github.

```
node src/account-create.js > aliengoat-trust.txt

```

```
Secret: SDU3DOU7RQP7RJZJGRDUOEDXFZ43RSJZHHJEE7JVZJZMD2A4U3DJ5Y4Z
Public Key: GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG
SUCCESS! You have a new account :)
 {
  _links: {
    transaction: {
      href: 'https://horizon-testnet.stellar.org/transactions/17d9fd5517c90c701395d6257780618e61c6fc92c3912a099bd5c2cec040d53f'
    }
  },
  hash: '17d9fd5517c90c701395d6257780618e61c6fc92c3912a099bd5c2cec040d53f',
  ledger: 1338580,
  envelope_xdr: 'AAAAAD5AU7woEiOISbfpZ+v0WUMqf3u9F5kY3Jg8zAF595wQAAGGoAAUFfgAAAAJAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAAAEH3Rayw4M0iCLoEe96rPFNGYim8AVHJU0z4ebYZW4JwAAAAAAAAAAP0X577YhD5/D0FPiEpedcXtiZ0c/TWK86mTa5SPV6ziAAAAF0h26AAAAAAAAAAAAnn3nBAAAABAorD0eDW9atS+MqjVdpdHwsjC5kq/UUi6l9udA8t5o8uu5aOooWGTn3L52BNl9cA5xPak+b4+KII6f6jDQK/UBoZW4JwAAABAKbMaJ0QG1l3fD5PDc+DBWZxgzwwNeVefBXB/dc6EDQVZNQpIVfNFvtLpctIT8f9Ch5XkdWW3DCQo+Yrjx5LKAQ==',
  result_xdr: 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAA=',
  result_meta_xdr: 'AAAAAQAAAAIAAAADABRs1AAAAAAAAAAAPkBTvCgSI4hJt+ln6/RZQyp/e70XmRjcmDzMAXn3nBAAAAAAPDHWwAAUFfgAAAAIAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABABRs1AAAAAAAAAAAPkBTvCgSI4hJt+ln6/RZQyp/e70XmRjcmDzMAXn3nBAAAAAAPDHWwAAUFfgAAAAJAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAwAAAAMAFGzOAAAAAAAAAAAQfdFrLDgzSIIugR73qs8U0ZiKbwBUclTTPh5thlbgnADjTcCUKlD0AAAAvwAAAEEAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAFGzUAAAAAAAAAAAQfdFrLDgzSIIugR73qs8U0ZiKbwBUclTTPh5thlbgnADjTalLs2j0AAAAvwAAAEEAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAFGzUAAAAAAAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAABdIdugAABRs1AAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA=='
}

```

### Step 4 - Validate balances

Replace the public key with the key generate for the Account
```
> node src/account-balance.js
```
```
Balances for account: GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG

```

Replace public key with the key generated for the Trust

```
> node src/account-balance.js
```

```
Balances for account: GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG
```

Key: The create account is used only for the development environment. There are a few requirments, such as minimal balance deposited with real lumens.

### Step 5 - Play with the accounts, and pass some lumens

```
> node src/sendTransaction.js
```

```
Success! Results: {
  memo: 'Test Transaction',
  _links: {
    self: {
      href: 'https://horizon-testnet.stellar.org/transactions/4bc3de23ef65b90b662bfddc0be181ecee11370dcf740791d2f9a25f0364abd4'
    },
    account: {
      href: 'https://horizon-testnet.stellar.org/accounts/GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ'
    },
    ledger: { href: 'https://horizon-testnet.stellar.org/ledgers/1338946' },
    operations: {
      href: 'https://horizon-testnet.stellar.org/transactions/4bc3de23ef65b90b662bfddc0be181ecee11370dcf740791d2f9a25f0364abd4/operations{?cursor,limit,order}',
      templated: true
    },
    effects: {
      href: 'https://horizon-testnet.stellar.org/transactions/4bc3de23ef65b90b662bfddc0be181ecee11370dcf740791d2f9a25f0364abd4/effects{?cursor,limit,order}',
      templated: true
    },
    precedes: {
      href: 'https://horizon-testnet.stellar.org/transactions?order=asc&cursor=5750729281130496'
    },
    succeeds: {
      href: 'https://horizon-testnet.stellar.org/transactions?order=desc&cursor=5750729281130496'
    },
    transaction: {
      href: 'https://horizon-testnet.stellar.org/transactions/4bc3de23ef65b90b662bfddc0be181ecee11370dcf740791d2f9a25f0364abd4'
    }
  },
  id: '4bc3de23ef65b90b662bfddc0be181ecee11370dcf740791d2f9a25f0364abd4',
  paging_token: '5750729281130496',
  successful: true,
  hash: '4bc3de23ef65b90b662bfddc0be181ecee11370dcf740791d2f9a25f0364abd4',
  ledger: 1338946,
  created_at: '2020-04-22T21:15:22Z',
  source_account: 'GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ',
  source_account_sequence: '5748891035107331',
  fee_account: 'GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ',
  fee_charged: 100,
  max_fee: 100,
  operation_count: 1,
  envelope_xdr: 'AAAAAIUWtCKrR1YQhKH0m7GnGXjIIj77pZqy1JdlJvQbNSNsAAAAZAAUbJYAAAADAAAAAQAAAAAAAAAAAAAAAF6gtJ0AAAABAAAAEFRlc3QgVHJhbnNhY3Rpb24AAAABAAAAAAAAAAEAAAAA/RfnvtiEPn8PQU+ISl51xe2JnRz9NYrzqZNrlI9XrOIAAAAAAAAAAAX14QAAAAAAAAAAARs1I2wAAABAm86Et8FwXHECTKuzc17ydZ/qCOEDkGYXqt7z+/XtxIwHY8lHGlvHF6GbCPs6z1yos+P0MaFxPnj3Z210zf+dDA==',
  result_xdr: 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAA=',
  result_meta_xdr: 'AAAAAQAAAAIAAAADABRuQgAAAAAAAAAAhRa0IqtHVhCEofSbsacZeMgiPvulmrLUl2Um9Bs1I2wAAAAXPIsk1AAUbJYAAAACAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABABRuQgAAAAAAAAAAhRa0IqtHVhCEofSbsacZeMgiPvulmrLUl2Um9Bs1I2wAAAAXPIsk1AAUbJYAAAADAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAABAAAAAMAFGzUAAAAAAAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAABdIdugAABRs1AAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAFG5CAAAAAAAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAABdObMkAABRs1AAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAMAFG5CAAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAABc8iyTUABRslgAAAAMAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAFG5CAAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAABc2lUPUABRslgAAAAMAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA==',
  fee_meta_xdr: 'AAAAAgAAAAMAFG4uAAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAABc8iyU4ABRslgAAAAIAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAFG5CAAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAABc8iyTUABRslgAAAAIAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA==',
  memo_type: 'text',
  signatures: [
    'm86Et8FwXHECTKuzc17ydZ/qCOEDkGYXqt7z+/XtxIwHY8lHGlvHF6GbCPs6z1yos+P0MaFxPnj3Z210zf+dDA=='
  ],
  valid_after: '1970-01-01T00:00:00Z',
  valid_before: '2020-04-22T21:18:21Z',
  offerResults: undefined
}
```

```
> node src/account-balance.js

```
*Woohoo!*
```
Balances for account: GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ
Type: native , Balance: 10010.0000000
```



