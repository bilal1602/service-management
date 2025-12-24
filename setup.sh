#!/bin/bash
set -e

echo "🚀 Setting up project..."

# Enable Corepack for Yarn
echo "🧶 Enabling Corepack..."
corepack enable

# Install dependencies
echo "📥 Installing dependencies..."
yarn install

# Setup environment files (if samples exist)
echo "🔐 Setting up environment files..."
[ -f .env.sample ] && [ ! -f .env ] && cp .env.sample .env
[ -f apps/client/.env.sample ] && [ ! -f apps/client/.env.local ] && cp apps/client/.env.sample apps/client/.env.local
[ -f apps/backend/.env.sample ] && [ ! -f apps/backend/.env ] && cp apps/backend/.env.sample apps/backend/.env

echo "✅ Setup complete!"