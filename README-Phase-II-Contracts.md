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

## Install Stellar CLI (Soroban)

The deploy helper requires the `stellar` CLI.

### macOS (Homebrew)

```bash
brew install stellar-cli
stellar --version
```

### Debian/Ubuntu (APT)

```bash
sudo apt update
sudo apt install stellar-cli
stellar --version
```

### If package manager install is unavailable

Use the official prebuilt release binary from Stellar CLI releases and verify:

```bash
stellar --version
```

## Deploy helper script (next step)

A starter script is included:

- `scripts/soroban-deploy.sh`

Example:

```bash
NETWORK=testnet \
SOURCE=admin \
ADMIN_ADDRESS=G... \
TOKEN_ID=C... \
MAX_PER_REWARD=10 \
./scripts/soroban-deploy.sh
```

The script will:

1. build contract wasm
2. deploy contract
3. call `init`
4. read back `admin` and `max_per_reward`

## Notes

- This repo includes the contract scaffold and a deploy/init helper.
- Run in an environment with `stellar` CLI configured for your target network.
- Keep admin key handling separate from day-to-day app runtime if possible.

---

## Why this is the “full-mile minimal” path

You get real on-chain policy enforcement now, without rewriting your entire project around contracts in one jump.
