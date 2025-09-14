FROM node:18-alpine AS base

# Set pnpm
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app

# Install build dependencies for better-sqlite3
RUN apk add python3 make g++ --no-cache

# Copy monorepo config & lockfiles
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY .npmrc ./

# Copy package.json des apps/packages (pour résolution workspaces)
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/

# Copy packages source (essential for workspace packages)
COPY --chown=1001:1001 packages ./packages

# Simple install without trying to add extra packages
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

# Copier deps + source
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY . .

# Ensure Nest.js is available for this app
WORKDIR /app/apps/api
RUN pnpm add @nestjs/cli@latest
WORKDIR /app

# Build app + deps avec Turbo
RUN pnpm turbo build --filter=api

FROM base AS runner
WORKDIR /app
ARG PORT=4000

ENV NODE_ENV=production
ENV PORT=$PORT

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copy built NestJS application
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./package.json

# Copy node_modules for runtime dependencies
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages

# Copy entrypoint script if it exists
COPY --from=builder /app/apps/api/docker-entrypoint.sh ./docker-entrypoint.sh

# Make entrypoint executable
USER root
RUN if [ -f "./docker-entrypoint.sh" ]; then \
      chmod +x docker-entrypoint.sh; \
      echo "Entrypoint script made executable"; \
    else \
      echo "No entrypoint script found"; \
    fi
USER nestjs

EXPOSE $PORT

# Start the application
CMD ["./docker-entrypoint.sh"]





# Dockerfile pour l'API NestJS
# Usage: docker build --build-arg APP_NAME=api --build-arg PORT=4000 -f Dockerfile .

FROM node:18-alpine AS base
RUN apk update && apk add --no-cache libc6-compat

# Set pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG APP_NAME=api
ARG PORT=4000

FROM base AS deps
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY .npmrc ./

# Copy ALL app package.json files for proper workspace resolution
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/

# Copy packages source (essential for workspace packages)
COPY --chown=1001:1001 packages ./packages

# Ensure directories exist
RUN find apps -name package.json -exec dirname {} \; | xargs -I {} mkdir -p {}

# Simple install without trying to add extra packages
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

ARG APP_NAME

# Copy dependencies and source
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY . .

# Ensure Nest.js is available for this app
RUN cd apps/"$APP_NAME" && \
    echo "=== Checking Nest.js availability ===" && \
    (../../node_modules/.bin/nest --version 2>/dev/null && echo "✅ Nest.js found in root" || \
     ../node_modules/.bin/nest --version 2>/dev/null && echo "✅ Nest.js found in apps" || \
     pnpm exec nest --version 2>/dev/null && echo "✅ Nest.js via pnpm exec" || \
     (echo "❌ Nest.js not found, installing locally..." && pnpm add @nestjs/cli@latest))

# Build using turbo (handles missing CLI tools automatically)
RUN echo "Building $APP_NAME and its dependencies..." && \
    pnpm turbo build --filter="$APP_NAME"

FROM base AS runner
WORKDIR /app

ARG APP_NAME
ARG PORT

ENV NODE_ENV=production
ENV PORT=$PORT

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copy built NestJS application
COPY --from=builder --chown=nestjs:nodejs /app/apps/$APP_NAME/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/$APP_NAME/package.json ./package.json

## Create the expected keys directory structure
#RUN mkdir -p /app/keys && \
#    openssl genrsa -out /app/keys/private.pem 2048 && \
#    openssl rsa -in /app/keys/private.pem -pubout -out /app/keys/public.pem && \
#    chown -R nestjs:nodejs /app/keys

# Copy node_modules for runtime dependencies
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages

# Copy entrypoint script if it exists
COPY --from=builder /app/apps/$APP_NAME/docker-entrypoint.sh ./docker-entrypoint.sh

# Make entrypoint executable
USER root
RUN if [ -f "./docker-entrypoint.sh" ]; then \
      chmod +x docker-entrypoint.sh; \
      echo "Entrypoint script made executable"; \
    else \
      echo "No entrypoint script found"; \
    fi
USER nestjs

EXPOSE $PORT

# Start the application
CMD ["./docker-entrypoint.sh"]