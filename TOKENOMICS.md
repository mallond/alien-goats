# TOKENOMICS.md — Alien Goat (Draft Framework)

> Draft educational framework for planning issuance and allocation policy.
> Not legal, tax, accounting, or investment advice.

## 1) Core Definitions

- **Max Supply**: Total number of tokens that can ever exist.
- **Circulating Supply**: Tokens currently unlocked and transferable.
- **Locked Supply**: Minted or reserved tokens that are not yet transferable (policy/vesting controlled).
- **FDV (Fully Diluted Valuation)**: `max_supply * market_price`.
- **Issuer**: Stellar account that creates ALIENGOAT units.

---

## 2) Suggested Supply Policy (Example)

Assume:

- `MAX_SUPPLY = 1,000,000,000 ALIENGOAT`

Example allocation split:

- **Seed Supporters**: `10%` → `100,000,000`
- **Treasury / Community**: `30%` → `300,000,000`
- **Ecosystem / Grants**: `20%` → `200,000,000`
- **Team / Advisors (vested)**: `20%` → `200,000,000`
- **Liquidity / Market Ops**: `20%` → `200,000,000`

Formula:

```text
bucket_tokens = MAX_SUPPLY * bucket_percent
```

---

## 3) Seed Donation → Token Calculation

## Simple fixed-price model

```text
tokens_awarded = donation_usd / seed_price_usd
```

If `seed_price_usd = 0.002`:

- $100 donation → `50,000` tokens
- $500 donation → `250,000` tokens
- $1,000 donation → `500,000` tokens

## Weighted early-support model (optional)

```text
tokens_awarded = (donation_usd / seed_price_usd) * time_multiplier
```

Example multipliers:

- Wave 1 (first 30 days): `1.25x`
- Wave 2 (next 30 days): `1.10x`
- Wave 3 (final): `1.00x`

Add optional limits:

- `min_allocation_tokens`
- `max_allocation_tokens_per_wallet`

---

## 4) Mint Budget Guardrails

Define hard caps before minting:

- `seed_cap_tokens`
- `monthly_mint_cap_tokens`
- `treasury_unlocked_cap_tokens`

Validation checks before each mint:

```text
remaining_seed = seed_cap_tokens - seed_minted_so_far
mint_allowed = min(remaining_seed, monthly_mint_cap_tokens_remaining)
```

Reject mint if:

- requested amount > `mint_allowed`
- destination wallet not in approved allocation table

---

## 5) Dilution & Emission Math

Let:

- `S0` = circulating supply now
- `Mt` = newly unlocked/minted supply in period `t`

Then:

```text
S_t = S_(t-1) + M_t
period_dilution_pct = M_t / S_(t-1)
```

Example:

- Circulating now: `50,000,000`
- New unlock this month: `5,000,000`

```text
dilution = 5,000,000 / 50,000,000 = 10%
```

---

## 6) Treasury Runway (Token + Cash)

If treasury sells tokens to fund operations:

- `monthly_burn_usd`
- `avg_realized_token_price_usd`

```text
tokens_needed_per_month = monthly_burn_usd / avg_realized_token_price_usd
runway_months = treasury_unlocked_tokens / tokens_needed_per_month
```

---

## 7) Recommended Production Policy

1. Publish allocation table and formulas before launch.
2. Keep a signed ledger (`allocations.csv`) of donation → wallet → tokens.
3. Mint in batches (daily/weekly), not ad-hoc one-offs.
4. Use multisig on issuer/distribution accounts.
5. Consider issuer flags (`auth-required`, `auth-revocable`) before broad distribution.
6. Add independent reconciliation after each mint batch.

---

## 8) Example Allocation Table (CSV shape)

```csv
wallet,donation_usd,wave,multiplier,seed_price_usd,tokens_awarded,status
GXXXX...,500,1,1.25,0.002,312500,pending
GYYYY...,1200,2,1.10,0.002,660000,pending
GZZZZ...,100,3,1.00,0.002,50000,pending
```

Calculation reference:

```text
tokens_awarded = (donation_usd / seed_price_usd) * multiplier
```

---

## 9) Pre-Mint Checklist (Finance + Ops)

- [ ] Destination trustline exists and is verified
- [ ] Wallet appears in approved allocation sheet
- [ ] Amount matches formula output
- [ ] Mint is within period/bucket cap
- [ ] Transaction hash recorded in audit log
- [ ] Post-mint balance reconciliation completed

---

## 10) Communicating Token Math Publicly

For community transparency, publish:

- Max supply and each bucket %
- Vesting + unlock calendar
- Current circulating supply
- Minted-to-date vs cap
- Method used to convert donations into allocations

This reduces confusion and builds trust around issuance discipline.
