# Trade XLM (Simple, Practical Advice)

This is a concise guide for trading **XLM ⇄ stablecoin** (no fiat conversion), focused on low-cost execution and discipline.

---

## Best Venue Choice (General)

For cheapest effective execution, start by comparing:

1. **Binance** (often lowest raw fees + deep liquidity, region-dependent)
2. **Kraken Pro** (transparent fees, strong liquidity)
3. **OKX / Bybit** (can be competitive depending on jurisdiction)

Use **pro order books** (not instant buy/sell screens).

---

## Best Pairs

- `XLM/USDT`
- `XLM/USDC`

Pick the pair with tighter spread and deeper order book at your trade size.

---

## Cheap Execution Rules

1. Prefer **maker limit orders** over taker market orders.
2. Always check **spread + slippage**, not just fee table.
3. Keep size proportional to order-book depth.
4. Avoid thin-liquidity periods.
5. Minimize cross-exchange hopping unless needed.

---

## 2-Minute Pre-Trade Checklist

- Pair selected (`XLM/USDT` or `XLM/USDC`)
- Pro mode enabled
- Maker/taker fee tier confirmed
- Spread acceptable
- Depth supports your size
- Roundtrip cost estimate done (entry + exit + slippage)
- Trade plan clear (entry / exit / invalidate)

If total expected cost is larger than your expected edge, skip the trade.

---

## Roundtrip Cost Formula (Quick SWAG)

`total_cost_% = entry_fee_% + exit_fee_% + spread_slippage_%`

`cost_amount = position_size × (total_cost_% / 100)`

Trade only when your expected move is meaningfully above total cost.

---

## Venue Selection Notes

Do not pick by brand alone. Re-check periodically:

- fee schedule changes
- liquidity changes
- region restrictions
- API/platform reliability

The “best” venue can change over time.

---

## Tooling in this repo

A one-page checklist app is included:

- `daytrade-checklist.html`

It provides:

- checklist tracking
- cost estimator
- reminder annotations saved locally

---

## Risk Reminder

This is operational guidance, not financial advice.
Use strict risk controls and position sizing.
