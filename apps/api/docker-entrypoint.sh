#!/bin/sh
set -e

echo "Starting Famsub API..."
echo "Connecting to PostgresSQL database..."
until nc -z -v -w30 postgres 5432
do
  echo "Waiting for database connection..."
  sleep 5
done

# Check if we have a built application
ls -la ./ 2>/dev/null || echo "❌ Directory ./ not found"
ls -la ./dist/ 2>/dev/null || echo "❌ Directory ./dist/ not found"
ls -la ./dist/src/ 2>/dev/null || echo "❌ Directory ./dist/src/ not found"

# Run database migrations if they exist
if [ -f "./package.json" ] && grep -q '"migration:run"' "./package.json"; then
    echo "Running database migrations..."
    pnpm run migration:run || echo "No migrations to run or migration failed (continuing...)"
fi

# Run database seeds if they exist
if [ -f "./package.json" ] && grep -q '"seed"' "./package.json"; then
    echo "Running database seeds..."
    pnpm run seed || echo "No seeds to run or seeding failed (continuing...)"
fi

echo "Starting the NestJS API application..."
exec node dist/src/main.js