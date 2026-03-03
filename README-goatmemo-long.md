# GoatMemo Long Form: Encrypted IPFS + Stellar Memo Hash

A practical architecture for anchoring encrypted documents on Stellar using `memo hash`.

---

## Goal

Store sensitive documents in IPFS **without clear text exposure**, while keeping a tamper-evident proof on-chain.

You want:

- Confidentiality (document is encrypted before upload)
- Integrity (on-chain hash commitment)
- Auditability (transaction hash + off-chain record mapping)

---

## Why memo text is not enough

Stellar memo text is limited to **28 bytes**.

Typical IPFS CIDs are much longer:

- CIDv0: ~46 chars
- CIDv1: often ~59+ chars

So full CID does not fit in memo text.

---

## Why Memo Hash is the right fit

Stellar `memo hash` stores exactly **32 bytes**.

That matches a SHA-256 digest perfectly.

Best default commitment:

- `doc_hash = SHA-256(encrypted_blob_bytes)`

This gives a deterministic proof of the exact ciphertext version referenced by your process.

---

## Recommended End-to-End Flow

1. **Prepare document**
   - Start with plaintext doc locally.

2. **Encrypt locally**
   - Use a modern authenticated scheme (example: AES-256-GCM or XChaCha20-Poly1305).
   - Output encrypted blob (ciphertext + nonce/IV + auth tag according to your format).

3. **Upload encrypted blob to IPFS**
   - Receive CID.
   - Do not upload plaintext.

4. **Compute commitment hash**
   - `doc_hash = SHA-256(encrypted_blob_bytes)`

5. **Submit Stellar transaction with memo type = hash**
   - Set memo hash to `doc_hash` (32 bytes).
   - Keep tx hash as immutable anchor ID.

6. **Store private/off-chain metadata record**
   - Map tx hash + memo hash + CID + encryption metadata + key reference.

7. **Verification later**
   - Retrieve encrypted blob by CID.
   - Recompute SHA-256.
   - Compare with on-chain memo hash.
   - Match = integrity confirmed.

---

## Suggested Off-Chain Record Schema

Use any DB/JSON store. Example fields:

- `record_id`
- `stellar_tx_hash`
- `stellar_memo_hash_hex`
- `network` (`testnet` / `mainnet`)
- `ipfs_cid`
- `encryption_alg` (e.g., `AES-256-GCM`)
- `encryption_version` (e.g., `v1`)
- `key_ref` (KMS key alias/id, **not raw key**)
- `created_at`
- `created_by`
- `doc_type`
- `notes`

---

## Security Rules

1. Never put plaintext in memo.
2. Never put secrets/keys in memo.
3. Treat memo values as public and durable.
4. Keep decryption keys in proper key management (KMS/HSM/password manager with controls).
5. Rotate keys by policy and version your encryption format.

---

## Shelf Life / Retention Notes

- Memo hash is part of transaction history and is treated as durable on-chain.
- It does not expire based on account balance or asset state.
- Some APIs/indexers may vary in deep-history query convenience; keep your own archive/index too.

---

## Optional Companion Pattern (Short Human Pointer)

If operators need a readable clue, pair memo hash with a short GoatMemo text in operational logs or related flows, e.g.:

- `MC|X|0|DOC7A2`

Where `DOC7A2` resolves in your private index to full CID + metadata.

---

## Example Use Case Snapshot

- Encrypted compliance PDF uploaded to IPFS
- CID stored off-chain in secure index
- SHA-256(ciphertext) committed as Stellar memo hash
- Tx hash shared with auditors as timestamped commitment
- Auditor can independently verify integrity without accessing decryption key

This gives strong audit posture without exposing document contents on-chain.
