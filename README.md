# alien-goats CLI

A rebuilt, minimal CLI for creating and minting **ALIENGOAT** tokens on **Stellar testnet**.

## Install

```bash
npm install
npm link
cp .env.example .env
```

## Fast path (new)

Create issuer + holder, fund both, build trustline, and optionally mint:

```bash
alien-goats setup --mint-amount 40000000
```

This prints reusable keys/env values.

## Environment variables (new)

All sensitive args can come from `.env`:

```env
ALIENGOAT_HORIZON=https://horizon-testnet.stellar.org
ALIENGOAT_FRIENDBOT=https://friendbot.stellar.org
ALIENGOAT_ASSET_CODE=ALIENGOAT
ALIENGOAT_ISSUER_SECRET=S...
ALIENGOAT_ISSUER_PUBLIC=G...
ALIENGOAT_HOLDER_SECRET=S...
ALIENGOAT_DESTINATION=G...
ALIENGOAT_PUBLIC=G...
ALIENGOAT_MINT_AMOUNT=1000
```

CLI flags still override env vars.

## Commands

### Generate keypairs
```bash
alien-goats keygen
```

### Fund an account
```bash
alien-goats fund --public-key G...
# or with .env
alien-goats fund
```

### Create trustline
```bash
alien-goats trust --holder-secret S... --issuer G...
# or with .env
alien-goats trust
```

### Mint
```bash
alien-goats mint --issuer-secret S... --destination G... --amount 1000
# or with .env
alien-goats mint
```

### Balance
```bash
alien-goats balance --public-key G...
# or with .env
alien-goats balance
```

## Typical manual flow

```bash
alien-goats keygen  # issuer
alien-goats keygen  # holder
alien-goats fund --public-key <ISSUER_PUBLIC>
alien-goats fund --public-key <HOLDER_PUBLIC>
alien-goats trust --holder-secret <HOLDER_SECRET> --issuer <ISSUER_PUBLIC>
alien-goats mint --issuer-secret <ISSUER_SECRET> --destination <HOLDER_PUBLIC> --amount 40000000
alien-goats balance --public-key <HOLDER_PUBLIC>
```

> ⚠️ Testnet only. Do not reuse this workflow or keys for mainnet without hardening.

## Automated smoke test

```bash
npm run test:e2e
```

This runs a full testnet flow (`setup` + `balance`) and verifies the minted amount appears.

## Cleanup script (new)

To clean test assets/accounts created by setup:

```bash
npm run cleanup -- \
  --issuer-secret S... \
  --holder-secret S...
```

What it does:
1. Sends holder's ALIENGOAT balance back to issuer
2. Removes holder trustline (limit=0)
3. Merges holder account into issuer

You can also set secrets in `.env` (`ALIENGOAT_ISSUER_SECRET`, `ALIENGOAT_HOLDER_SECRET`) and run:

```bash
npm run cleanup
```
