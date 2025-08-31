.PHONY: help install dev build test lint typecheck clean db db-seed db-stop feat-gen start

# Default target
help: ## Show this help message
	@echo "Famsub Development Commands"
	@echo "=========================="
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Installation
install: ## Install all dependencies
	@echo "📦 Installing dependencies..."
	pnpm install

# Development
dev: ## Start all applications in development mode
	@echo "🚀 Starting development servers..."
	pnpm dev

dev-web: ## Start only web application
	@echo "🚀 Starting web app..."
	pnpm dev --filter=web

dev-admin: ## Start only admin application
	@echo "🚀 Starting admin dashboard..."
	pnpm dev --filter=admin

dev-api: ## Start only API application
	@echo "🚀 Starting API server..."
	pnpm dev --filter=api

# Build
build: ## Build all applications
	@echo "🏗️  Building all applications..."
	pnpm build

build-web: ## Build only web application
	turbo build --filter=web

build-admin: ## Build only admin application
	pnpm build --filter=admin

build-api: ## Build only API application
	pnpm build --filter=api

# Testing
test: ## Run all tests
	@echo "🧪 Running tests..."
	pnpm test

test-api: ## Run API tests with coverage
	@echo "🧪 Running API tests with coverage..."
	cd apps/api && pnpm test:cov

test-watch: ## Run API tests in watch mode
	@echo "🧪 Running API tests in watch mode..."
	cd apps/api && pnpm test:watch

test-e2e: ## Run API e2e tests
	@echo "🧪 Running API e2e tests..."
	cd apps/api && pnpm test:e2e

# Code Quality
lint: ## Lint all code
	@echo "🔍 Linting code..."
	pnpm lint

lint-fix: ## Fix linting issues
	@echo "🔧 Fixing lint issues..."
	cd apps/web && pnpm lint:fix
	cd apps/admin && pnpm format

typecheck: ## Type check all applications
	@echo "📝 Type checking..."
	pnpm typecheck

# Database
db: ## Start PostgreSQL database
	@echo "🗄️  Starting database..."
	cd apps/api && ./scripts/start-db.sh

db-seed: ## Run database seeds
	@echo "🌱 Seeding database..."
	cd apps/api && pnpm seed

db-stop: ## Stop database container
	@echo "⏹️  Stopping database..."
	docker stop postgres_famsub || true
	docker rm postgres_famsub || true

# API Utilities
feat-gen: ## Generate new API feature (usage: make feat-gen name=feature-name)
	@if [ -z "$(name)" ]; then \
		echo "❌ Error: Please provide a feature name. Usage: make feat-gen name=feature-name"; \
		exit 1; \
	fi
	@echo "🏗️  Generating feature: $(name)"
	cd apps/api && pnpm feat:generate $(name)
	@echo "✅ Feature '$(name)' generated successfully!"
	@echo "📝 Don't forget to add the module to apps/api/src/app.module.ts"

# Production
start: ## Start production builds
	@echo "🚀 Starting production servers..."
	pnpm start

# Cleanup
clean: ## Clean dependencies and build artifacts
	@echo "🧹 Cleaning up..."
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/.nuxt
	rm -rf apps/*/.output
	rm -rf apps/*/dist
	rm -rf packages/*/dist
	rm -rf .turbo
	@echo "✅ Cleanup complete!"

clean-install: clean install ## Clean and reinstall dependencies

# Git
git-reset: ## Reset git state (careful!)
	@echo "⚠️  Resetting git state..."
	git reset --hard HEAD
	git clean -fd

# Docker utilities
docker-logs: ## Show database container logs
	docker logs postgres_famsub

docker-exec: ## Execute bash in database container
	docker exec -it postgres_famsub bash

docker-psql: ## Connect to PostgresSQL in container
	docker exec -it postgres_famsub psql -U postgres -d famsub_db