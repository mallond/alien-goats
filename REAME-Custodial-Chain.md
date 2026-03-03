# Custodial Chain for Cloud-Native Vending Ops

A practical map of who maintains what, who owns what, and where operational risk lives when running a vending-token system without in-house infrastructure.

---

## Why this matters

If you are 100% cloud-native, your business depends on a chain of providers.

When something fails, customers still expect:

- payment accepted or refunded
- product dispensed reliably
- balances and receipts to reconcile

So you need clear custodial and operational ownership boundaries.

---

## Layered Custodial Chain

## 1) Protocol Layer (Stellar Network)

**Maintained by:** decentralized validator network + ecosystem contributors.

**You own:** your on-chain accounts and asset definitions (through keys/policies).

**You do not own:** protocol upgrade cadence or global network governance.

**Primary risk:** network-level disruptions or ecosystem-wide incidents.

---

## 2) Blockchain Access Layer (API/Indexer Providers)

**Maintained by:** Horizon/indexer infrastructure vendors.

**You own:** app behavior and retry/fallback logic.

**You do not own:** provider uptime/SLA/retention policy.

**Primary risk:** your app cannot read/write chain state during provider outage.

---

## 3) Key Custody / Signing Layer

This layer is the most important control point.

Custody spectrum:

1. **Self-custody** (you hold keys)
2. **KMS-assisted self-custody** (cloud KMS, you control IAM/policies)
3. **Shared/MPC custody** (vendor co-controls signing)
4. **Full custody** (vendor controls keys)

**Rule:** If you do not control signing policy, you do not fully control funds flow.

---

## 4) App + Data Layer (Cloud Native)

**Maintained by:** cloud providers + your application stack.

**You own:** vending business rules, payout/reward logic, reconciliation workflow.

**You do not own:** cloud regional outages or managed-service incidents.

**Primary risk:** successful chain tx but failed dispense workflow (or vice versa).

---

## 5) Device/Edge Layer (Machines)

**Maintained by:** hardware vendors + your operations team.

**You own:** machine behavior policy (dispense, retry, refund logic).

**Primary risk:** offline devices, firmware bugs, bad telemetry, stale state.

---

## Ownership Matrix (Simple)

- **Legal ownership:** your company/entity
- **Financial control:** custody/signing policy
- **Operational control:** app + device orchestration
- **Evidence control:** immutable logs + tx-hash-linked receipts

If these are split across vendors, document exactly who can stop which function.

---

## Failure-Mode Thinking (What breaks if X goes down?)

- API provider down → reads/writes stall unless fallback provider exists
- Custody service down → no signatures, no transfers/mints
- Cloud queue/db issue → pending vend actions drift from chain truth
- Device network outage → payment may settle, dispense delayed

Design for graceful degradation, not perfect uptime.

---

## Minimum Guardrails (Recommended)

1. Dual-provider strategy for chain reads (primary + fallback)
2. Signed operation policy tiers (small auto, large human approval)
3. Daily reconciliation (order id ↔ tx hash ↔ machine event)
4. Idempotent dispense/refund logic
5. Cold archive of operational logs and chain anchors

---

## Practical Default for Small Operators

- KMS-assisted custody (you keep policy control)
- Managed chain API + fallback endpoint
- Simple event log table with tx hashes and machine IDs
- Nightly reconciliation + alerting

Start lean, but never skip custody and reconciliation discipline.
