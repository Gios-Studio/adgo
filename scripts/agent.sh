#!/usr/bin/env bash
set -euo pipefail

TASK="${1:-scaffold_pages}"

# --- Config ---
FUNCTIONS_URL="${SUPABASE_FUNCTIONS_URL:-https://ykqsavtoqrhrimvwjubz.functions.supabase.co}"
TOKEN="${SRK:-}"

if [[ -z "$TOKEN" ]]; then
  echo "ERROR: SRK (Service Role key) not set in this shell."
  echo "Export it first: export SRK='eyJ...'"
  exit 1
fi

echo "Calling agent-tick with task=$TASK ..."
curl -sS "${FUNCTIONS_URL}/agent-tick" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"task\":\"${TASK}\"}"
echo
