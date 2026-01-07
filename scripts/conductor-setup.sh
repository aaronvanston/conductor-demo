#!/bin/bash
# Conductor setup script for demorepo

set -e

# Get paths
WORKSPACE_PATH="${CONDUCTOR_WORKSPACE_PATH:-$(pwd)}"
ROOT_PATH="${CONDUCTOR_ROOT_PATH:-$(pwd)}"

echo "Setting up workspace..."
echo "Workspace path: $WORKSPACE_PATH"
echo "Root path: $ROOT_PATH"

# Copy environment files if they exist
if [ -f "$ROOT_PATH/.env.local" ]; then
  cp "$ROOT_PATH/.env.local" "$WORKSPACE_PATH/.env.local"
  echo "Copied .env.local"
fi

if [ -f "$ROOT_PATH/.env" ]; then
  cp "$ROOT_PATH/.env" "$WORKSPACE_PATH/.env"
  echo "Copied .env"
fi

# Copy Vercel configuration if it exists
if [ -d "$ROOT_PATH/.vercel" ]; then
  cp -r "$ROOT_PATH/.vercel" "$WORKSPACE_PATH/"
  echo "Copied .vercel configuration"
fi

# Install dependencies
echo "Installing dependencies..."
bun install

echo "Setup complete!"
