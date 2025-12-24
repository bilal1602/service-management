# Service Management

A monorepo application built with Nx, featuring a Next.js frontend and NestJS backend.

## Tech Stack

| Layer        | Technology                                                           |
| ------------ | -------------------------------------------------------------------- |
| **Monorepo** | [Nx](https://nx.dev)                                                 |
| **Frontend** | [Next.js](https://nextjs.org) 16, React 19, Ant Design, Tailwind CSS |
| **Backend**  | [NestJS](https://nestjs.com) 11                                      |
| **Database** | [Prisma](https://prisma.io) ORM                                      |
| **Auth**     | [Supabase](https://supabase.com)                                     |
| **State**    | Zustand, TanStack Query                                              |

## Prerequisites

- **Node.js**: `24.11.1` (use `nvm use` to switch)
- **Yarn**: `4.10.3` (via Corepack)

## Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd service-management

# Run setup script (installs dependencies + copies env files)
yarn setup

# Configure environment variables (see section below)

# Start development
yarn dev
```

## Environment Variables

Environment files are **git-ignored**. Copy from `.sample` files and fill in your values:

### Root (Shared)

```bash
cp .env.sample .env
```

### Frontend (`apps/client`)

```bash
cp apps/client/.env.sample apps/client/.env.local
```

| Variable                        | Description            |
| ------------------------------- | ---------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_API_URL`           | Backend API URL        |

### Backend (`apps/backend`)

```bash
cp apps/backend/.env.sample apps/backend/.env
```

| Variable       | Description                       |
| -------------- | --------------------------------- |
| `PORT`         | Server port (default: 8080)       |
| `JWT_SECRET`   | Secret for JWT tokens             |
| `DATABASE_URL` | Prisma database connection string |

## Available Scripts

| Command       | Description                        |
| ------------- | ---------------------------------- |
| `yarn setup`  | Initial project setup              |
| `yarn dev`    | Run frontend + backend in dev mode |
| `yarn build`  | Build all apps                     |
| `yarn lint`   | Lint all apps                      |
| `yarn test`   | Run all tests                      |
| `yarn format` | Format code with Prettier          |

### Prisma Commands

| Command                | Description             |
| ---------------------- | ----------------------- |
| `yarn prisma:generate` | Generate Prisma client  |
| `yarn prisma:migrate`  | Run database migrations |
| `yarn prisma:studio`   | Open Prisma Studio      |

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
│   └── schema.prisma    # Database schema
└── package.json
```

## Adding New Projects

```bash
# Generate a new app
npx nx g @nx/next:app demo

# Generate a shared library
npx nx g @nx/react:lib mylib

# Visualize project graph
npx nx graph
```

For more Nx features, see the [Nx Documentation](https://nx.dev).

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

## Useful Links

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
