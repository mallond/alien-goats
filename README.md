# alien-goats CLI

A rebuilt, minimal CLI for creating and minting **ALIENGOAT** tokens on **Stellar testnet**.

This project started as learning scripts; it is now a command-focused workflow:

1. generate keys
2. fund testnet accounts
3. create trustline
4. mint token
5. check balances

> ⚠️ Testnet only. Never use these commands/secrets on mainnet as-is.

## Install

```bash
npm install
npm link
```

After linking, the `alien-goats` command is available globally.

## Commands

### 1) Generate keypairs

```bash
alien-goats keygen
```

Create one keypair for issuer and one for holder/distributor.

### 2) Fund accounts (testnet)

```bash
alien-goats fund --public G...
```

### 3) Create trustline on holder account

```bash
alien-goats trust \
  --holder-secret S... \
  --issuer G...
```

Optional:

- `--limit 5000000000`
- `--memo "ALIENGOAT trustline"`
- global `--horizon https://horizon-testnet.stellar.org`

### 4) Mint ALIENGOAT from issuer to holder

```bash
alien-goats mint \
  --issuer-secret S... \
  --destination G... \
  --amount 1000
```

Optional:

- `--asset-code ALIENGOAT`
- `--memo "ALIENGOAT mint"`
- global `--horizon https://horizon-testnet.stellar.org`

### 5) Check balances

```bash
alien-goats balance --public G...
```

## Quick end-to-end example

```bash
# generate issuer + holder (run twice)
alien-goats keygen

# fund both accounts
alien-goats fund --public <ISSUER_PUBLIC>
alien-goats fund --public <HOLDER_PUBLIC>

# holder trusts issuer asset
alien-goats trust --holder-secret <HOLDER_SECRET> --issuer <ISSUER_PUBLIC>

# issuer mints to holder
alien-goats mint --issuer-secret <ISSUER_SECRET> --destination <HOLDER_PUBLIC> --amount 40000000

# verify
alien-goats balance --public <HOLDER_PUBLIC>
```

## Notes

- Asset code defaults to `ALIENGOAT`.
- Asset issuer is inferred from issuer secret during mint.
- If mint fails, verify the destination trustline exists and has enough limit.
