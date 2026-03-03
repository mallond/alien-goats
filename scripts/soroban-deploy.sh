#!/usr/bin/env bash
set -euo pipefail

# Soroban deploy helper for Phase II reward-controller
#
# Usage example:
#   NETWORK=testnet \
#   SOURCE=admin \
#   ADMIN_ADDRESS=G... \
#   TOKEN_ID=CDLZ... \
#   MAX_PER_REWARD=10 \
#   ./scripts/soroban-deploy.sh

NETWORK="${NETWORK:-testnet}"
SOURCE="${SOURCE:-admin}"
ADMIN_ADDRESS="${ADMIN_ADDRESS:-}"
TOKEN_ID="${TOKEN_ID:-}"
MAX_PER_REWARD="${MAX_PER_REWARD:-10}"
CONTRACT_DIR="contracts/soroban/reward-controller"
WASM_PATH="$CONTRACT_DIR/target/wasm32v1-none/release/reward_controller.wasm"

if ! command -v stellar >/dev/null 2>&1; then
  echo "Error: stellar CLI not found. Install Soroban/Stellar CLI first." >&2
  exit 1
fi

if [[ -z "$ADMIN_ADDRESS" || -z "$TOKEN_ID" ]]; then
  echo "Error: ADMIN_ADDRESS and TOKEN_ID are required." >&2
  exit 1
fi

echo "[1/4] Building reward-controller contract..."
stellar contract build --package reward-controller --manifest-path "$CONTRACT_DIR/Cargo.toml"

if [[ ! -f "$WASM_PATH" ]]; then
  echo "Error: wasm not found at $WASM_PATH" >&2
  exit 1
fi

echo "[2/4] Deploying contract to $NETWORK using source '$SOURCE'..."
CONTRACT_ID="$(stellar contract deploy \
  --wasm "$WASM_PATH" \
  --source "$SOURCE" \
  --network "$NETWORK")"

echo "CONTRACT_ID=$CONTRACT_ID"

echo "[3/4] Initializing contract..."
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source "$SOURCE" \
  --network "$NETWORK" \
  -- init \
  --admin "$ADMIN_ADDRESS" \
  --token_id "$TOKEN_ID" \
  --max_per_reward "$MAX_PER_REWARD"

echo "[4/4] Reading config back..."
CUR_MAX="$(stellar contract invoke --id "$CONTRACT_ID" --source "$SOURCE" --network "$NETWORK" -- max_per_reward)"
CUR_ADMIN="$(stellar contract invoke --id "$CONTRACT_ID" --source "$SOURCE" --network "$NETWORK" -- admin)"

echo "Deployed and initialized successfully"
echo "NETWORK=$NETWORK"
echo "CONTRACT_ID=$CONTRACT_ID"
echo "ADMIN=$CUR_ADMIN"
echo "MAX_PER_REWARD=$CUR_MAX"
