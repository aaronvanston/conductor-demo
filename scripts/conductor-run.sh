#!/bin/bash
# Conductor run script for demorepo

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Extract workspace name from branch name for the indicator
BRANCH_NAME=$(git branch --show-current 2>/dev/null || echo "")
if [ -n "$BRANCH_NAME" ]; then
  export NEXT_PUBLIC_WORKSPACE_NAME="$BRANCH_NAME"
fi

# Check for filter configuration
FILTER_FILE="$ROOT_DIR/.context/conductor-run.env"
if [ -f "$FILTER_FILE" ]; then
  source "$FILTER_FILE"
fi

echo "Starting development server..."
echo "Workspace: ${NEXT_PUBLIC_WORKSPACE_NAME:-main}"

# Watch dev server ports and sync APP_PORTS into app .env.local files.
"$SCRIPT_DIR/dev-ports-watch.sh" >/dev/null 2>&1 &
APP_PORTS_WATCH_PID=$!
trap 'kill "$APP_PORTS_WATCH_PID" 2>/dev/null || true' EXIT

# Run turbo dev
if [ -n "$TURBO_FILTER" ]; then
  bun turbo run dev $TURBO_FILTER
else
  bun turbo run dev
fi
