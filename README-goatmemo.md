# GoatMemo v1

A tiny memo-text convention for Stellar transaction memos with a **28-byte max** (Memo Text).

Use this when you want short, structured, human-decodable metadata on-chain.

---

## Why GoatMemo exists

Stellar Memo Text is limited to 28 bytes. Free-form sentences are hard to standardize and easy to misread.

GoatMemo gives you:

- compact encoding
- consistent structure
- simple decode logic
- room for references (ticket id, tx prefix, batch id)

---

## Format

`<E><N>|<A>|<Q>|<R>`

Where:

- `E` = environment (1 char)
- `N` = event code (1 char)
- `A` = account role (1 char)
- `Q` = quantity (usually base36)
- `R` = reference token (short id/hash fragment)

Example:

`TM|H|NLSL0|71E05C`

---

## Field dictionary

### `E` (Environment)

- `T` = testnet
- `M` = mainnet

### `N` (Event)

- `M` = mint
- `R` = redeem / burn
- `T` = trustline create/update
- `L` = lock issuer flags
- `A` = airdrop
- `P` = payout
- `C` = compliance / KYC checkpoint
- `S` = snapshot
- `U` = config update
- `X` = exception / manual review

### `A` (Role)

- `I` = issuer
- `H` = holder
- `D` = distribution account
- `X` = external/counterparty

### `Q` (Quantity)

- recommended: **base36** (`0-9A-Z`) to minimize bytes
- for non-quantity events, use `0`

Example:

- decimal `40000000` → base36 `NLSL0`

### `R` (Reference)

Short operator reference, typically 4–8 chars:

- tx hash prefix (`71E05C`)
- ticket id (`J92F`)
- batch id (`B07`)
- checklist token (`AUTHON`)

---

## Validation rules

To keep parsing reliable:

1. Must contain exactly 3 separators (`|`) and 4 fields.
2. `E` must be `T` or `M`.
3. `N` must be one of the declared event codes.
4. `A` must be one of `I/H/D/X`.
5. `Q` should be `[0-9A-Z]+` (or `0`).
6. `R` should be `[A-Z0-9-]{2,10}` for brevity.
7. Full memo must be **<= 28 bytes**.

---

## Examples

### Mint 40,000,000 on testnet to holder

- Human: “Testnet mint to holder, amount 40M, ref tx 71E05C”
- GoatMemo: `TM|H|NLSL0|71E05C`

### Mainnet trustline event

- GoatMemo: `MT|H|0|1514E4`

### Mainnet issuer lock config change

- GoatMemo: `ML|I|0|AUTHON`

### Mainnet airdrop batch

- GoatMemo: `MA|D|2S|B07`

### Compliance checkpoint

- GoatMemo: `MC|H|0|KYCOK`

---

## Decode cheat sheet

`TM|H|NLSL0|71E05C` means:

- `T` = testnet
- `M` = mint
- `H` = holder
- `NLSL0` = 40,000,000 (base36)
- `71E05C` = operator reference

---

## Operational guidance

- Treat GoatMemo as a **pointer**, not a full audit record.
- Keep full context in off-chain logs/docs.
- Standardize event/role dictionary across your team.
- Reject non-conforming memos in scripts where possible.

---

## Security note

Do **not** place secrets, private data, or personal info in memos.
Transaction memos are publicly visible.
