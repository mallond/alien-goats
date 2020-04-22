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

### Step 2 - Create the Trust

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

### Step 3 - Validate balances

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

### Step 4 - Play with the accounts, and pass some lumens

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

### Step 5 - Let's get to the fun stuff and create an Asset

```
> node src/account-issue.js

```
```
{
  _links: {
    self: {
      href: 'https://horizon-testnet.stellar.org/transactions/ce2ab9e0c9d1469d3e3ad0f0f664806e356611e1dc07a1491d4ba2d92c88249f'
    },
    account: {
      href: 'https://horizon-testnet.stellar.org/accounts/GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG'
    },
    ledger: { href: 'https://horizon-testnet.stellar.org/ledgers/1339383' },
    operations: {
      href: 'https://horizon-testnet.stellar.org/transactions/ce2ab9e0c9d1469d3e3ad0f0f664806e356611e1dc07a1491d4ba2d92c88249f/operations{?cursor,limit,order}',
      templated: true
    },
    effects: {
      href: 'https://horizon-testnet.stellar.org/transactions/ce2ab9e0c9d1469d3e3ad0f0f664806e356611e1dc07a1491d4ba2d92c88249f/effects{?cursor,limit,order}',
      templated: true
    },
    precedes: {
      href: 'https://horizon-testnet.stellar.org/transactions?order=asc&cursor=5752606181838848'
    },
    succeeds: {
      href: 'https://horizon-testnet.stellar.org/transactions?order=desc&cursor=5752606181838848'
    },
    transaction: {
      href: 'https://horizon-testnet.stellar.org/transactions/ce2ab9e0c9d1469d3e3ad0f0f664806e356611e1dc07a1491d4ba2d92c88249f'
    }
  },
  id: 'ce2ab9e0c9d1469d3e3ad0f0f664806e356611e1dc07a1491d4ba2d92c88249f',
  paging_token: '5752606181838848',
  successful: true,
  hash: 'ce2ab9e0c9d1469d3e3ad0f0f664806e356611e1dc07a1491d4ba2d92c88249f',
  ledger: 1339383,
  created_at: '2020-04-22T21:55:52Z',
  source_account: 'GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG',
  source_account_sequence: '5749157323079681',
  fee_account: 'GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG',
  fee_charged: 100,
  max_fee: 100,
  operation_count: 1,
  envelope_xdr: 'AAAAAP0X577YhD5/D0FPiEpedcXtiZ0c/TWK86mTa5SPV6ziAAAAZAAUbNQAAAABAAAAAQAAAAAAAAAAAAAAAF6gvcgAAAAAAAAAAQAAAAAAAAAGAAAAAkFMSUVOR09BVAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAAAJUC+QAAAAAAAAAAAGPV6ziAAAAQOYKEUrxvqKUK74wXub7ElxBJ0xK6VRLM4FJWhKtzxamhoUC99SxyErBnXJKQQp8HzZRo1GsJbg/vkC1Yqa/jQg=',
  result_xdr: 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAAGAAAAAAAAAAA=',
  result_meta_xdr: 'AAAAAQAAAAIAAAADABRv9wAAAAAAAAAA/RfnvtiEPn8PQU+ISl51xe2JnRz9NYrzqZNrlI9XrOIAAAAXTmzInAAUbNQAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABABRv9wAAAAAAAAAA/RfnvtiEPn8PQU+ISl51xe2JnRz9NYrzqZNrlI9XrOIAAAAXTmzInAAUbNQAAAABAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAwAAAAMAFG/3AAAAAAAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAABdObMicABRs1AAAAAEAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAFG/3AAAAAAAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAABdObMicABRs1AAAAAEAAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAFG/3AAAAAQAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAAAJBTElFTkdPQVQAAAAAAAAAhRa0IqtHVhCEofSbsacZeMgiPvulmrLUl2Um9Bs1I2wAAAAAAAAAAAAAAAJUC+QAAAAAAQAAAAAAAAAA',
  fee_meta_xdr: 'AAAAAgAAAAMAFG5CAAAAAAAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAABdObMkAABRs1AAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAFG/3AAAAAAAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAABdObMicABRs1AAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA==',
  memo_type: 'none',
  signatures: [
    '5goRSvG+opQrvjBe5vsSXEEnTErpVEszgUlaEq3PFqaGhQL31LHISsGdckpBCnwfNlGjUawluD++QLVipr+NCA=='
  ],
  valid_after: '1970-01-01T00:00:00Z',
  valid_before: '2020-04-22T21:57:28Z',
  offerResults: undefined
}
{
  _links: {
    self: {
      href: 'https://horizon-testnet.stellar.org/transactions/6141289cce2d598b23c29279962ba8657681e227117ba74343cf64204919cadb'
    },
    account: {
      href: 'https://horizon-testnet.stellar.org/accounts/GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ'
    },
    ledger: { href: 'https://horizon-testnet.stellar.org/ledgers/1339384' },
    operations: {
      href: 'https://horizon-testnet.stellar.org/transactions/6141289cce2d598b23c29279962ba8657681e227117ba74343cf64204919cadb/operations{?cursor,limit,order}',
      templated: true
    },
    effects: {
      href: 'https://horizon-testnet.stellar.org/transactions/6141289cce2d598b23c29279962ba8657681e227117ba74343cf64204919cadb/effects{?cursor,limit,order}',
      templated: true
    },
    precedes: {
      href: 'https://horizon-testnet.stellar.org/transactions?order=asc&cursor=5752610476793856'
    },
    succeeds: {
      href: 'https://horizon-testnet.stellar.org/transactions?order=desc&cursor=5752610476793856'
    },
    transaction: {
      href: 'https://horizon-testnet.stellar.org/transactions/6141289cce2d598b23c29279962ba8657681e227117ba74343cf64204919cadb'
    }
  },
  id: '6141289cce2d598b23c29279962ba8657681e227117ba74343cf64204919cadb',
  paging_token: '5752610476793856',
  successful: true,
  hash: '6141289cce2d598b23c29279962ba8657681e227117ba74343cf64204919cadb',
  ledger: 1339384,
  created_at: '2020-04-22T21:55:57Z',
  source_account: 'GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ',
  source_account_sequence: '5748891035107332',
  fee_account: 'GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ',
  fee_charged: 100,
  max_fee: 100,
  operation_count: 1,
  envelope_xdr: 'AAAAAIUWtCKrR1YQhKH0m7GnGXjIIj77pZqy1JdlJvQbNSNsAAAAZAAUbJYAAAAEAAAAAQAAAAAAAAAAAAAAAF6gvcwAAAAAAAAAAQAAAAAAAAABAAAAAP0X577YhD5/D0FPiEpedcXtiZ0c/TWK86mTa5SPV6ziAAAAAkFMSUVOR09BVAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAAAAF9eEAAAAAAAAAAAEbNSNsAAAAQA8YlNeg+dIt6I1etMnaDSwvfjss1hEH2lY70yDzWLsC4xnIdL1xVFiHInA2qwra5Jyd6kqwAVdpiAhvBY79VgA=',
  result_xdr: 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAA=',
  result_meta_xdr: 'AAAAAQAAAAIAAAADABRv+AAAAAAAAAAAhRa0IqtHVhCEofSbsacZeMgiPvulmrLUl2Um9Bs1I2wAAAAXNpVDcAAUbJYAAAADAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABABRv+AAAAAAAAAAAhRa0IqtHVhCEofSbsacZeMgiPvulmrLUl2Um9Bs1I2wAAAAXNpVDcAAUbJYAAAAEAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAMAFG/3AAAAAQAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAAAJBTElFTkdPQVQAAAAAAAAAhRa0IqtHVhCEofSbsacZeMgiPvulmrLUl2Um9Bs1I2wAAAAAAAAAAAAAAAJUC+QAAAAAAQAAAAAAAAAAAAAAAQAUb/gAAAABAAAAAP0X577YhD5/D0FPiEpedcXtiZ0c/TWK86mTa5SPV6ziAAAAAkFMSUVOR09BVAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAAAAF9eEAAAAAAlQL5AAAAAABAAAAAAAAAAA=',
  fee_meta_xdr: 'AAAAAgAAAAMAFG5CAAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAABc2lUPUABRslgAAAAMAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAFG/4AAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAABc2lUNwABRslgAAAAMAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA==',
  memo_type: 'none',
  signatures: [
    'DxiU16D50i3ojV60ydoNLC9+OyzWEQfaVjvTIPNYuwLjGch0vXFUWIcicDarCtrknJ3qSrABV2mICG8Fjv1WAA=='
  ],
  valid_after: '1970-01-01T00:00:00Z',
  valid_before: '2020-04-22T21:57:32Z',
  offerResults: undefined
}
```

### Step 6 - Set the home domain of the Assit and Trust

```
> node src/account-issue.js
```
```
{
  _links: {
    self: {
      href: 'https://horizon-testnet.stellar.org/transactions/7f997760ba854c4b84ac4077c82ca4df8f8f513691fdb51c1439c00d03ee9c3c'
    },
    account: {
      href: 'https://horizon-testnet.stellar.org/accounts/GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG'
    },
    ledger: { href: 'https://horizon-testnet.stellar.org/ledgers/1339535' },
    operations: {
      href: 'https://horizon-testnet.stellar.org/transactions/7f997760ba854c4b84ac4077c82ca4df8f8f513691fdb51c1439c00d03ee9c3c/operations{?cursor,limit,order}',
      templated: true
    },
    effects: {
      href: 'https://horizon-testnet.stellar.org/transactions/7f997760ba854c4b84ac4077c82ca4df8f8f513691fdb51c1439c00d03ee9c3c/effects{?cursor,limit,order}',
      templated: true
    },
    precedes: {
      href: 'https://horizon-testnet.stellar.org/transactions?order=asc&cursor=5753259016859648'
    },
    succeeds: {
      href: 'https://horizon-testnet.stellar.org/transactions?order=desc&cursor=5753259016859648'
    },
    transaction: {
      href: 'https://horizon-testnet.stellar.org/transactions/7f997760ba854c4b84ac4077c82ca4df8f8f513691fdb51c1439c00d03ee9c3c'
    }
  },
  id: '7f997760ba854c4b84ac4077c82ca4df8f8f513691fdb51c1439c00d03ee9c3c',
  paging_token: '5753259016859648',
  successful: true,
  hash: '7f997760ba854c4b84ac4077c82ca4df8f8f513691fdb51c1439c00d03ee9c3c',
  ledger: 1339535,
  created_at: '2020-04-22T22:09:51Z',
  source_account: 'GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG',
  source_account_sequence: '5749157323079682',
  fee_account: 'GD6RPZ563CCD47YPIFHYQSS6OXC63CM5DT6TLCXTVGJWXFEPK6WOFFZG',
  fee_charged: 100,
  max_fee: 100,
  operation_count: 1,
  envelope_xdr: 'AAAAAP0X577YhD5/D0FPiEpedcXtiZ0c/TWK86mTa5SPV6ziAAAAZAAUbNQAAAACAAAAAQAAAAAAAAAAAAAAAF6gwRAAAAAAAAAAAQAAAAAAAAAGAAAAAkFMSUVOR09BVAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAAAJUC+QAAAAAAAAAAAGPV6ziAAAAQFuMSJ61J2dwqEuNjiJ6JDCnQcrsWZCDH4ez/0FoaJNJFLjTOoLWSXKZHa/TPFQX9DbYNnC5d5ydCEKeFD9Y3Qs=',
  result_xdr: 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAAGAAAAAAAAAAA=',
  result_meta_xdr: 'AAAAAQAAAAIAAAADABRwjwAAAAAAAAAA/RfnvtiEPn8PQU+ISl51xe2JnRz9NYrzqZNrlI9XrOIAAAAXTmzIOAAUbNQAAAABAAAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABABRwjwAAAAAAAAAA/RfnvtiEPn8PQU+ISl51xe2JnRz9NYrzqZNrlI9XrOIAAAAXTmzIOAAUbNQAAAACAAAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAMAFG/4AAAAAQAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAAAJBTElFTkdPQVQAAAAAAAAAhRa0IqtHVhCEofSbsacZeMgiPvulmrLUl2Um9Bs1I2wAAAAABfXhAAAAAAJUC+QAAAAAAQAAAAAAAAAAAAAAAQAUcI8AAAABAAAAAP0X577YhD5/D0FPiEpedcXtiZ0c/TWK86mTa5SPV6ziAAAAAkFMSUVOR09BVAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAAAAF9eEAAAAAAlQL5AAAAAABAAAAAAAAAAA=',
  fee_meta_xdr: 'AAAAAgAAAAMAFG/3AAAAAAAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAABdObMicABRs1AAAAAEAAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAFHCPAAAAAAAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAABdObMg4ABRs1AAAAAEAAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA==',
  memo_type: 'none',
  signatures: [
    'W4xInrUnZ3CoS42OInokMKdByuxZkIMfh7P/QWhok0kUuNM6gtZJcpkdr9M8VBf0Ntg2cLl3nJ0IQp4UP1jdCw=='
  ],
  valid_after: '1970-01-01T00:00:00Z',
  valid_before: '2020-04-22T22:11:28Z',
  offerResults: undefined
}
{
  _links: {
    self: {
      href: 'https://horizon-testnet.stellar.org/transactions/37d38ac568e14293a518d015b70f249aa06b0f16768ab613a434d9ccec691e21'
    },
    account: {
      href: 'https://horizon-testnet.stellar.org/accounts/GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ'
    },
    ledger: { href: 'https://horizon-testnet.stellar.org/ledgers/1339536' },
    operations: {
      href: 'https://horizon-testnet.stellar.org/transactions/37d38ac568e14293a518d015b70f249aa06b0f16768ab613a434d9ccec691e21/operations{?cursor,limit,order}',
      templated: true
    },
    effects: {
      href: 'https://horizon-testnet.stellar.org/transactions/37d38ac568e14293a518d015b70f249aa06b0f16768ab613a434d9ccec691e21/effects{?cursor,limit,order}',
      templated: true
    },
    precedes: {
      href: 'https://horizon-testnet.stellar.org/transactions?order=asc&cursor=5753263311826944'
    },
    succeeds: {
      href: 'https://horizon-testnet.stellar.org/transactions?order=desc&cursor=5753263311826944'
    },
    transaction: {
      href: 'https://horizon-testnet.stellar.org/transactions/37d38ac568e14293a518d015b70f249aa06b0f16768ab613a434d9ccec691e21'
    }
  },
  id: '37d38ac568e14293a518d015b70f249aa06b0f16768ab613a434d9ccec691e21',
  paging_token: '5753263311826944',
  successful: true,
  hash: '37d38ac568e14293a518d015b70f249aa06b0f16768ab613a434d9ccec691e21',
  ledger: 1339536,
  created_at: '2020-04-22T22:09:57Z',
  source_account: 'GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ',
  source_account_sequence: '5748891035107333',
  fee_account: 'GCCRNNBCVNDVMEEEUH2JXMNHDF4MQIR67OSZVMWUS5SSN5A3GURWYRRJ',
  fee_charged: 100,
  max_fee: 100,
  operation_count: 1,
  envelope_xdr: 'AAAAAIUWtCKrR1YQhKH0m7GnGXjIIj77pZqy1JdlJvQbNSNsAAAAZAAUbJYAAAAFAAAAAQAAAAAAAAAAAAAAAF6gwRYAAAAAAAAAAQAAAAAAAAABAAAAAP0X577YhD5/D0FPiEpedcXtiZ0c/TWK86mTa5SPV6ziAAAAAkFMSUVOR09BVAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAAAAF9eEAAAAAAAAAAAEbNSNsAAAAQKMe0lSGHizAIaaLvAaUrkpxKat65/lDX3R0Z1W2l/SkMagLrLCW58bBYSz8ieWVTZsXqvfitnC65NjlHc5n7AI=',
  result_xdr: 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAA=',
  result_meta_xdr: 'AAAAAQAAAAIAAAADABRwkAAAAAAAAAAAhRa0IqtHVhCEofSbsacZeMgiPvulmrLUl2Um9Bs1I2wAAAAXNpVDDAAUbJYAAAAEAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABABRwkAAAAAAAAAAAhRa0IqtHVhCEofSbsacZeMgiPvulmrLUl2Um9Bs1I2wAAAAXNpVDDAAUbJYAAAAFAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAMAFHCPAAAAAQAAAAD9F+e+2IQ+fw9BT4hKXnXF7YmdHP01ivOpk2uUj1es4gAAAAJBTElFTkdPQVQAAAAAAAAAhRa0IqtHVhCEofSbsacZeMgiPvulmrLUl2Um9Bs1I2wAAAAABfXhAAAAAAJUC+QAAAAAAQAAAAAAAAAAAAAAAQAUcJAAAAABAAAAAP0X577YhD5/D0FPiEpedcXtiZ0c/TWK86mTa5SPV6ziAAAAAkFMSUVOR09BVAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAAAAL68IAAAAAAlQL5AAAAAABAAAAAAAAAAA=',
  fee_meta_xdr: 'AAAAAgAAAAMAFG/4AAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAABc2lUNwABRslgAAAAQAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAFHCQAAAAAAAAAACFFrQiq0dWEISh9Juxpxl4yCI++6WastSXZSb0GzUjbAAAABc2lUMMABRslgAAAAQAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA==',
  memo_type: 'none',
  signatures: [
    'ox7SVIYeLMAhpou8BpSuSnEpq3rn+UNfdHRnVbaX9KQxqAussJbnxsFhLPyJ5ZVNmxeq9+K2cLrk2OUdzmfsAg=='
  ],
  valid_after: '1970-01-01T00:00:00Z',
  valid_before: '2020-04-22T22:11:34Z',
  offerResults: undefined
}
```

### Step 7  - Verify the Trust

```
> node src/account-verify-trust.js
```
```
Trusted :)
```
 