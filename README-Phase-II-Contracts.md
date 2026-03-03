# Phase II: Soroban Contracts (Full-Mile Starter)

This phase adds a minimal Soroban contract layer on top of the existing CLI token workflow.

Goal: keep the current `trust/mint/balance` flow, while introducing one enforceable on-chain policy for rewards.

---

## Scope (intentionally minimal)

We add one contract:

- `reward-controller`

It enforces:

- admin-controlled rewards
- max amount per reward call
- token transfer using Stellar token interface

This avoids over-design while giving you real contract guardrails.

---

## What was added

- `contracts/soroban/reward-controller/Cargo.toml`
- `contracts/soroban/reward-controller/src/lib.rs`

Contract methods:

- `init(admin, token_id, max_per_reward)`
- `admin()`
- `token()`
- `max_per_reward()`
- `set_max_per_reward(new_max)`
- `reward(to, amount)`

---

## Runtime behavior

- Contract can only be initialized once.
- `reward` requires admin auth.
- `reward` fails if `amount <= 0`.
- `reward` fails if `amount > max_per_reward`.
- Transfer happens through the token contract client.

---

## Suggested rollout plan

1. Keep issuing asset as you do today.
2. Deploy contract on **testnet**.
3. Initialize with small max (example: 10).
4. Run smoke rewards to test addresses.
5. Increase max only after reconciliation confidence.
6. Promote to mainnet once checks are stable.

---

## Notes

- This repo currently includes the contract scaffold and policy logic.
- Build/deploy wiring via Soroban CLI should be done in your environment where `soroban`/`stellar` CLI is installed.
- Keep admin key handling separate from day-to-day app runtime if possible.

---

## Why this is the “full-mile minimal” path

You get real on-chain policy enforcement now, without rewriting your entire project around contracts in one jump.
