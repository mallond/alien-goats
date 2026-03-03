# Storage Cost SWAG: Stellar at Full Adoption

A rough planning guide for long-term storage thinking when imagining high-throughput global adoption.

> SWAG = Scientific Wild-Ass Guess.
> These numbers are directional, not protocol guarantees.

---

## Why this document exists

When people say “microtransactions in the trillions,” the hard question is:

- how much data gets produced,
- who stores it,
- and what architecture keeps cost sane over decades.

This guide provides a practical 3-tier storage model and future-scale estimates.

---

## 3-Tier Architecture

### Tier 1 — Core Validator Layer (Consensus)

**Role:** validate and agree on ledgers.

**Optimized for:** correctness and consensus participation.

**Not optimized for:** rich historical search analytics.

**Storage profile:** smaller than analytics/indexing stacks, because it avoids many query-oriented expansions.

---

### Tier 2 — Query/Indexer Layer (Horizon-style)

**Role:** serve app/wallet/explorer queries quickly.

**Optimized for:** account/asset/time lookups, operational dashboards.

**Storage profile:** often the largest *hot* storage cost due to indexes and query acceleration structures.

---

### Tier 3 — Cold Archive / Data Lake

**Role:** long-term retention, auditability, deep analytics, replay.

**Optimized for:** low-cost durability over speed.

**Storage profile:** largest total bytes over long periods, cheapest $/TB if using object storage.

---

## Sizing Formula

Use this quick model:

`annual_storage_bytes = TPS × 31,536,000 × avg_bytes_per_tx`

Where:

- `TPS` = average transactions per second
- `avg_bytes_per_tx` = effective average record footprint (varies by implementation)

For SWAG purposes, use two brackets:

- Lean case: **500 bytes/tx**
- Fatter case: **1,000 bytes/tx**

---

## Future-Scale SWAG Table

### 1,000 TPS

- 500 B/tx: ~15.8 TB/year
- 1,000 B/tx: ~31.5 TB/year
- 20 years: ~316–630 TB

### 10,000 TPS

- 500 B/tx: ~158 TB/year
- 1,000 B/tx: ~315 TB/year
- 20 years: ~3.1–6.3 PB

### 100,000 TPS

- 500 B/tx: ~1.58 PB/year
- 1,000 B/tx: ~3.15 PB/year
- 20 years: ~31–63 PB

---

## Memo Impact (Text vs Hash)

For per-tx storage, memo type choice is usually a small delta compared to total tx footprint:

- Memo Text payload: up to 28 bytes
- Memo Hash payload: 32 bytes

Difference is tiny in full transaction context. Pick memo type for semantics/security, not storage savings.

---

## Cost-Control Pattern (Recommended)

1. Keep Tier 2 hot retention bounded (for example: 6–24 months).
2. Continuously export historical data to Tier 3 object storage.
3. Keep a reproducible ingest pipeline so historical queries can be replayed from archive.
4. Store off-chain enrichments (game analytics, user metadata) outside consensus-critical paths.

---

## For a Game Reward Token (Non-monetized)

Start small and instrument early:

- log every reward tx (player ref, amount, tx hash, memo)
- monthly archive exports
- monitor growth in records per daily active users

This gives real inputs for budget before scale surprises happen.

---

## Caveats

- Actual footprint depends on operation mix and indexing strategy.
- Managed providers may apply their own retention/indexing policies.
- This doc is for planning intuition, not precise infra procurement.
