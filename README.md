# FamSub

A full-stack family subscription management application built with modern web technologies.

## 🏗️ Architecture

This is a monorepo containing:

- **web App** (`apps/web`) - Nuxt 3 frontend with PWA support
- **Admin Dashboard** (`apps/admin`) - Nuxt 3 admin panel with Shadcn components
- **API** (`apps/api`) - NestJS backend with PostgreSQL
- **Shared Packages** (`packages/`) - Common types, UI components, and utilities

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (required for workspace management)
- Docker (for database)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd famsub

# Install dependencies
pnpm install
```

### Database Setup

Start the PostgresSQL database using Docker:

```bash
# Start database
make db

# Or manually:
cd apps/api && ./scripts/start-db.sh
```

### Development

```bash
# Start all applications in development mode
make dev

# Or manually:
pnpm dev
```

This will start:
- web app on `http://localhost:3000`
- Admin dashboard on `http://localhost:3001`
- API on `http://localhost:4000`

## 📋 Available Commands

### Using Make (Recommended)

```bash
make install     # Install dependencies
make dev        # Start development servers
make build      # Build all applications
make test       # Run all tests
make lint       # Lint all code
make typecheck  # Type check all applications
make db         # Start database
make clean      # Clean dependencies and build artifacts
```

### Using pnpm directly

```bash
pnpm install    # Install dependencies
pnpm dev        # Development mode
pnpm build      # Build all apps
pnpm test       # Run tests
pnpm lint       # Lint code
pnpm typecheck  # Type checking
```

### Individual App Development

```bash
# web app only
turbo dev --filter=web

# Admin dashboard only
turbo dev --filter=admin

# API only
turbo dev --filter=api
```

## 🛠️ API Development

### Database Operations

```bash
cd apps/api

# Run database seeds
pnpm seed

# Generate new feature
pnpm feat:generate <feature-name>
```

### Feature Generation

The API includes a custom feature generator:

```bash
cd apps/api
pnpm feat:generate user-profile
```

This creates:
- Module, Controller, Service
- Entity and DTOs
- Basic CRUD operations

## 🧪 Testing

```bash
# Run all tests
make test

# API tests with coverage
cd apps/api && pnpm test:cov

# Watch mode
cd apps/api && pnpm test:watch
```

## 📦 Tech Stack

### Frontend
- **Nuxt 3** - Full-stack Vue framework
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Pinia** - State management
- **TanStack Query** - Data fetching
- **Nuxt UI** - Component library (web)
- **Shadcn Vue + UnoCSS** - Components (admin)

### Backend
- **NestJS** - Node.js framework
- **TypeORM** - Database ORM
- **PostgresSQL** - Database
- **JWT** - Authentication
- **Swagger** - API documentation

### Tools
- **pnpm** - Package manager
- **Turbo** - Monorepo build system
- **Docker** - Database containerization
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚢 Deployment

### Build for Production

```bash
make build
```

### API Deployment

The API includes Sentry integration and sourcemap uploading configured in the build process.

## 📁 Project Structure

```
famsub/
├── apps/
│   ├── web/             # Nuxt 3 web app
│   ├── admin/           # Nuxt 3 admin dashboard
│   └── api/             # NestJS API
├── packages/
│   ├── types/           # Shared TypeScript types
│   ├── ui/              # Shared UI components
│   ├── utils/           # Shared utilities
│   └── tsconfig/        # Shared TypeScript configs
├── Makefile             # Development commands
├── turbo.json           # Turbo configuration
└── pnpm-workspace.yaml  # pnpm workspace config
```

## 🤝 Development Workflow

1. **Setup**: `make install && make db`
2. **Development**: `make dev`
3. **Features**: Use API generator for backend features
4. **Testing**: `make test` before committing
5. **Type Safety**: `make typecheck` to verify types

## 📄 License

Private project—All rights reserved