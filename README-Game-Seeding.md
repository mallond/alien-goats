# Game Seeding Guide (No Monetization)

A practical guide for game developers distributing ALIENGOAT-style rewards on Stellar when users are not expected to pay network costs.

---

## Scenario

You run a game.
You want to reward players with in-game alien-coins.
You do **not** intend to monetize the token.

Question: who pays network costs?

Short answer: **the game operator should pay**.

---

## Who pays gas/fees?

On Stellar, transaction fees are very small, but someone still pays them.

For a game economy, best UX is:

- **Operator-funded model** (recommended)
- players receive rewards without managing XLM for each action

This avoids onboarding friction and support headaches.

---

## Recommended Wallet Roles

Use clear separation of duties:

1. **Issuer account**
   - Defines the asset
   - Used for issuance policy controls
   - Protected heavily

2. **Distribution account**
   - Sends rewards to players
   - Holds operational token inventory

3. **Fee/ops float**
   - XLM buffer for fees and reserve overhead
   - Monitored and topped up regularly

---

## What actually costs XLM?

Two categories matter:

1. **Transaction fees**
   - tiny per operation
   - usually not the limiting factor

2. **Account/trustline reserve constraints**
   - often the bigger practical overhead in user onboarding flows

Design your game economy with both in mind.

---

## Starter Budget (Small Pilot)

For early production pilots, keep a conservative operator float.

Suggested starting range:

- **20–100 XLM** in operational wallets

Use this to learn your real burn profile over time.

---

## Rollout Plan (Low Risk)

1. Test end-to-end on testnet.
2. Launch a tiny mainnet cohort (10–20 players).
3. Run for a week and measure actual XLM usage.
4. Set refill thresholds (e.g., top up when balance drops below 30% of target float).
5. Scale cohort gradually.

---

## Policy Suggestions for Game Rewards

- Keep issuance predictable (daily/weekly caps)
- Log all reward batches (tx hash, player ID/ref, amount)
- Reconcile supply periodically
- Publish simple player-facing rules (“how rewards are earned, what they mean”)

Even without monetization, consistency builds trust.

---

## Common Mistakes to Avoid

- Large initial mint with no internal policy
- Mixing issuer and day-to-day distribution duties in one key
- No top-up monitoring for XLM operational float
- No audit trail for reward emissions

---

## Practical Default

If you want a clean default for launch week:

- Operator-funded fees
- Small initial distribution batch
- 20–100 XLM ops float
- Daily reconciliation

Then adjust with real usage data.
