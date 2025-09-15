FROM node:20-alpine AS base

# Set pnpm
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app

# Copy monorepo config & lockfiles
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY .npmrc ./

# Copy package.json des apps/packages (pour résolution workspaces)
COPY apps/*/package.json ./apps/
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
    echo "=== Checking Nest.js availability ===" && \
    (../../node_modules/.bin/nest --version 2>/dev/null && echo "✅ Nest.js found in root" || \
     ../node_modules/.bin/nest --version 2>/dev/null && echo "✅ Nest.js found in apps" || \
     pnpm exec nest --version 2>/dev/null && echo "✅ Nest.js via pnpm exec" || \
     (echo "❌ Nest.js not found, installing locally..." && pnpm add @nestjs/cli@latest))

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
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy node_modules for runtime dependencies
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages

# Copy entrypoint script if it exists
COPY --from=builder /app/apps/api/docker-entrypoint.sh ./docker-entrypoint.sh

# Make entrypoint executable
#USER root
#RUN if [ -f "./docker-entrypoint.sh" ]; then chmod +x docker-entrypoint.sh; fi
#USER nestjs

EXPOSE $PORT

# Start the application
# CMD ["./docker-entrypoint.sh"]
CMD [ "node", "dist/main" ]