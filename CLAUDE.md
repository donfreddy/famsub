# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a monorepo managed with pnpm and Turbo. All commands should be run from the root directory:

```bash
# Install dependencies
pnpm install

# Development (runs all apps in parallel)
pnpm dev

# Build all projects
pnpm build

# Lint all projects
pnpm lint

# Run tests across all projects  
pnpm test

# Type checking
pnpm typecheck

# Start production builds
pnpm start
```

### Individual App Commands

For app-specific development, use turbo filters:

```bash
# Run specific app
turbo dev --filter=client
turbo dev --filter=admin  
turbo dev --filter=api

# Build specific app
turbo build --filter=api
```

### API-Specific Commands

```bash
# Start database (Docker required)
cd apps/api && ./scripts/start-db.sh

# Run database seeds
cd apps/api && pnpm seed

# Generate new feature scaffold
cd apps/api && pnpm feat:generate <feature-name>

# Development with watch mode
cd apps/api && pnpm start:dev

# Run tests with coverage
cd apps/api && pnpm test:cov
```

## Architecture Overview

This is a full-stack application with three main apps and shared packages:

### Apps Structure
- **`apps/client/`** - Nuxt 3 frontend application with PWA support
  - Uses Vue 3, Pinia for state management
  - TanStack Query for data fetching
  - Nuxt UI component library
  - PWA capabilities with @vite-pwa/nuxt

- **`apps/admin/`** - Nuxt 3 admin dashboard
  - Built with Shading Vue components and UnoCSS
  - Uses Reika UI and Radix Vue for advanced components
  - TanStack Table for data grids

- **`apps/api/`** - NestJS backend API
  - TypeORM for database operations with PostgresSQL
  - JWT authentication via @nestjs/jwt
  - Swagger API documentation
  - Custom feature generator for scaffolding
  - Sentry integration for error tracking

### Shared Packages
- **`packages/types/`** - Shared TypeScript types across all apps
- **`packages/ui/`** - Shared UI components
- **`packages/utils/`** - Shared utility functions  
- **`packages/tsconfig/`** - Shared TypeScript configurations

## Key Technologies

- **Monorepo**: pnpm workspace + Turbo for build orchestration
- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Styling**: UnoCSS (admin), Nuxt UI (client)
- **State**: Pinia for Vue apps
- **Database**: PostgresSQL with Docker setup
- **Package Manager**: pnpm (required for workspace resolution)

## Database Setup

The API requires PostgreSQL. Use the provided Docker script:
```bash
cd apps/api && ./scripts/start-db.sh
```
This creates a PostgreSQL container named `postgres_famsub` on port 15432.

## Testing

- API uses Jest for unit and e2e testing
- Each app has its own test configuration
- Run `pnpm test` from root to test all packages

## Development Workflow

1. Always run `pnpm install` from the root after pulling changes
2. Use `pnpm dev` for parallel development of all apps
3. API requires a database to be running before starting
4. Turbo handles dependency resolution between packages automatically
5. Use the API feature generator for consistent module scaffolding