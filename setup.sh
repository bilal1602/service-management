#!/bin/bash
set -e

echo "🚀 Setting up project..."

# Enable Corepack for Yarn
echo "🧶 Enabling Corepack..."
corepack enable

# Install dependencies
echo "📥 Installing dependencies..."
yarn install

# Setup environment files
echo "🔐 Setting up environment files..."

# Root .env (for Prisma)
if [ ! -f .env ]; then
  cat > .env << 'EOF'
# Database
# Get this from Supabase: Settings > Database > Connection string > URI
DATABASE_URL="postgresql://postgres:postgres@localhost:54322/postgres"
EOF
  echo "✅ Created .env"
else
  echo "⚠️  .env already exists, skipping..."
fi

# Client .env.local
if [ ! -f apps/client/.env.local ]; then
  cat > apps/client/.env.local << 'EOF'
# Supabase
# Get these from Supabase: Settings > API
NEXT_PUBLIC_SUPABASE_URL="http://localhost:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"

# API
NEXT_PUBLIC_API_URL="http://localhost:8080/api"
EOF
  echo "✅ Created apps/client/.env.local"
else
  echo "⚠️  apps/client/.env.local already exists, skipping..."
fi

# Backend .env
if [ ! -f apps/backend/.env ]; then
  cat > apps/backend/.env << 'EOF'
# Server
NODE_ENV=development
PORT=8080

# Auth
# Generate a secure random string: openssl rand -base64 32
JWT_SECRET="your-jwt-secret-here"
EOF
  echo "✅ Created apps/backend/.env"
else
  echo "⚠️  apps/backend/.env already exists, skipping..."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Update .env files with your actual values"
echo "   2. Run 'yarn db:setup' to start Supabase and seed the database"
echo "   3. Run 'yarn dev' to start development servers"