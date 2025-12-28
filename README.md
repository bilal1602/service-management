# Service Management

A monorepo application built with Nx, featuring a Next.js frontend and NestJS backend.

## Tech Stack

| Layer        | Technology                                                           |
| ------------ | -------------------------------------------------------------------- |
| **Monorepo** | [Nx](https://nx.dev)                                                 |
| **Frontend** | [Next.js](https://nextjs.org) 16, React 19, Ant Design, Tailwind CSS |
| **Backend**  | [NestJS](https://nestjs.com) 11                                      |
| **Database** | [Prisma](https://prisma.io) ORM, [Supabase](https://supabase.com)    |
| **Auth**     | [Supabase](https://supabase.com)                                     |
| **State**    | Zustand, TanStack Query                                              |

## Prerequisites

- **Node.js**: `24.11.1` (use `nvm use` to switch)
- **Yarn**: `4.10.3` (via Corepack)
- **Docker**: Required for Supabase local development

## Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd service-management

# Run setup (installs dependencies + creates env files)
yarn setup

# Configure environment variables (see section below)
# Update the generated .env files with your actual values

# Start Supabase and seed database
yarn db:setup

# Start development servers
yarn dev
```

## Environment Variables

The `setup.sh` script automatically creates `.env` files with placeholder values. You need to update them with your actual configuration.

### Root (`.env`)

Used by Prisma for database connection:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:54322/postgres"
```

**How to get:** After running `yarn db:start`, the connection string is shown in the output, or check `yarn db:status`.

### Frontend (`apps/client/.env.local`)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL="http://localhost:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"

# API
NEXT_PUBLIC_API_URL="http://localhost:8080/api"
```

**How to get Supabase values:**

1. Run `yarn db:start`
2. Run `yarn db:status` to see the API URL and anon key
3. Or check Supabase dashboard: Settings > API

### Backend (`apps/backend/.env`)

```bash
# Server
NODE_ENV=development
PORT=8080

# Auth
# Generate a secure random string: openssl rand -base64 32
JWT_SECRET="your-jwt-secret-here"
```

**How to generate JWT_SECRET:**

```bash
openssl rand -base64 32
```

## Available Scripts

### Setup

| Command      | Description                              |
| ------------ | ---------------------------------------- |
| `yarn setup` | Initial project setup (deps + env files) |

### Development

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `yarn dev`         | Run frontend + backend in dev mode |
| `yarn dev:client`  | Run only frontend                  |
| `yarn dev:backend` | Run only backend                   |

### Build & Test

| Command           | Description             |
| ----------------- | ----------------------- |
| `yarn build`      | Build all apps          |
| `yarn lint`       | Lint all apps           |
| `yarn lint:fix`   | Lint and auto-fix       |
| `yarn test`       | Run all tests           |
| `yarn test:watch` | Run tests in watch mode |

### Formatting

| Command             | Description               |
| ------------------- | ------------------------- |
| `yarn format`       | Format code with Prettier |
| `yarn format:check` | Check formatting (CI)     |

### Database (Supabase)

| Command          | Description                                        |
| ---------------- | -------------------------------------------------- |
| `yarn db:start`  | Start local Supabase instance                      |
| `yarn db:stop`   | Stop local Supabase instance                       |
| `yarn db:reset`  | Reset database (drops all data)                    |
| `yarn db:seed`   | Seed database with initial data                    |
| `yarn db:setup`  | Full setup: start + reset + seed + generate Prisma |
| `yarn db:status` | Show Supabase connection details                   |
| `yarn db:logs`   | View Supabase logs                                 |

### Prisma

| Command                | Description             |
| ---------------------- | ----------------------- |
| `yarn prisma:generate` | Generate Prisma client  |
| `yarn prisma:migrate`  | Run database migrations |
| `yarn prisma:studio`   | Open Prisma Studio UI   |
| `yarn prisma:format`   | Format Prisma schema    |
| `yarn prisma:validate` | Validate Prisma schema  |

## Project Structure

```
├── apps/
│   ├── client/          # Next.js frontend
│   │   └── src/
│   │       ├── app/     # App router pages
│   │       ├── components/
│   │       ├── lib/     # Utilities (supabase, api, config)
│   │       ├── providers/
│   │       ├── store/   # Zustand stores
│   │       └── theme/   # Ant Design theming
│   └── backend/         # NestJS backend
│       └── src/
│           ├── app/
│           └── modules/
├── libs/
│   └── shared/          # Shared utilities/constants
├── prisma/
│   └── schema/          # Database schema (multi-file)
├── supabase/
│   ├── migrations/      # Database migrations
│   └── seed.sql         # Seed data
└── package.json
```

## Development Workflow

### First Time Setup

```bash
# 1. Setup project
yarn setup

# 2. Update .env files with actual values
# (See Environment Variables section)

# 3. Start database and seed
yarn db:setup

# 4. Start development
yarn dev
```

### Daily Development

```bash
# Start Supabase (if not running)
yarn db:start

# Start dev servers
yarn dev
```

### Database Changes

```bash
# 1. Modify Prisma schema in prisma/schema/
# 2. Create migration
yarn prisma:migrate

# 3. Generate Prisma client
yarn prisma:generate

# 4. (Optional) Reset and reseed
yarn db:reset && yarn db:seed
```

## Development Tools

| Tool            | Purpose              | Config File            |
| --------------- | -------------------- | ---------------------- |
| **ESLint**      | Code linting         | `eslint.config.mjs`    |
| **Prettier**    | Code formatting      | `.prettierrc`          |
| **Husky**       | Git hooks            | `.husky/`              |
| **lint-staged** | Format staged files  | `package.json`         |
| **Commitlint**  | Conventional commits | `commitlint.config.js` |

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add login page
fix: resolve auth redirect issue
chore: update dependencies
docs: update README
```

## VS Code Setup

Recommended extensions are listed in `.vscode/extensions.json`. Install them for the best DX:

- Nx Console
- Prettier
- ESLint
- Tailwind CSS IntelliSense

## Troubleshooting

### Database Connection Issues

```bash
# Check Supabase status
yarn db:status

# Restart Supabase
yarn db:stop && yarn db:start
```

### Prisma Client Not Found

```bash
# Regenerate Prisma client
yarn prisma:generate
```

### Port Already in Use

- Frontend: Change `PORT` in `apps/client/package.json` or use `-p` flag
- Backend: Change `PORT` in `apps/backend/.env`
- Supabase: Check `supabase/config.toml`

## Useful Links

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
