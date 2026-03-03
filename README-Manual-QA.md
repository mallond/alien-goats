# Manual QA Guide for `alien-goats setup --mint-amount 40000000`

This document describes a practical manual QA checklist after running:

```bash
alien-goats setup --mint-amount 40000000
```

## 0) Confirm network used

In this CLI, `setup` is testnet-only. If this command succeeds, the mint happened on Stellar testnet.

---

## 1) Validate setup command output

From the `setup` output, confirm all of these fields are present:

- `ISSUER_PUBLIC=...`
- `ISSUER_SECRET=...`
- `HOLDER_PUBLIC=...`
- `HOLDER_SECRET=...`
- `TRUST_TX=...`
- `MINT_TX=...`
- `MINT_AMOUNT=40000000`

If any are missing, treat the run as incomplete/suspicious.

---

## 2) Check holder balance (primary assertion)

Use the holder public key returned by setup:

```bash
alien-goats balance --public-key <HOLDER_PUBLIC>
```

Expected output should include:

- an `XLM` balance line
- the issued asset balance:
  - `ALIENGOAT:<ISSUER_PUBLIC> = 40000000`
  - or decimal form such as `40000000.0000000`

---

## 3) Check issuer balance

```bash
alien-goats balance --public-key <ISSUER_PUBLIC>
```

Expected:

- issuer has an `XLM` balance
- holder still reflects the minted amount from this issuer

---

## 4) Verify trustline + mint transactions on-chain

Open these links (testnet):

- `https://stellar.expert/explorer/testnet/tx/<TRUST_TX>`
- `https://stellar.expert/explorer/testnet/tx/<MINT_TX>`
- `https://stellar.expert/explorer/testnet/account/<HOLDER_PUBLIC>`

Expected:

- `TRUST_TX` contains a `changeTrust` operation
- `MINT_TX` contains a `payment` operation of `ALIENGOAT` from issuer to holder
- holder account page shows a trustline for `ALIENGOAT` issued by `<ISSUER_PUBLIC>`

---

## 5) Optional reproducibility sanity check

Run the automated e2e smoke test:

```bash
npm run test:e2e
```

This validates setup + balance flow end-to-end on testnet.

---

## Pass/Fail Criteria

Mark QA as **PASS** when all are true:

1. setup output includes all required keys/tx ids
2. holder balance equals minted amount (`40000000`)
3. trust transaction is valid (`changeTrust`)
4. mint transaction is valid (`payment` of `ALIENGOAT`)

If any check fails, mark as **FAIL** and capture:

- failing step number
- command/output snippet
- tx hash (if available)
- suspected root cause
