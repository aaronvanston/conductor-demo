#!/bin/bash
# Conductor run script for demorepo

set -e

# Extract workspace name from branch name for the indicator
BRANCH_NAME=$(git branch --show-current 2>/dev/null || echo "")
if [ -n "$BRANCH_NAME" ]; then
  export NEXT_PUBLIC_WORKSPACE_NAME="$BRANCH_NAME"
fi

# Check for filter configuration
FILTER_FILE=".context/conductor-run.env"
if [ -f "$FILTER_FILE" ]; then
  source "$FILTER_FILE"
fi

# Default to running all apps if no filter specified
if [ -z "$TURBO_FILTER" ]; then
  TURBO_FILTER=""
fi

echo "Starting development server..."
echo "Workspace: ${NEXT_PUBLIC_WORKSPACE_NAME:-main}"

# Run turbo dev with any specified filters
if [ -n "$TURBO_FILTER" ]; then
  bun turbo run dev $TURBO_FILTER
else
  bun turbo run dev
fi
