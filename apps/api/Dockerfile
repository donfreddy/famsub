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
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/

# Simple install without trying to add extra packages
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

# Copier deps + source
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY . .

# Ensure Nest.js is available for this app
RUN cd apps/api && \
    pnpm add @nestjs/cli@latest

# Build app + deps avec Turbo
RUN pnpm turbo build --filter=api

FROM node:18-alpine AS runner
WORKDIR /app
ARG PORT=4000

ENV NODE_ENV=production
ENV PORT=$PORT

RUN addgroup -S nodejs && adduser -S nestjs -G nodejs

# Copy build & runtime deps
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages

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