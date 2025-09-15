#!/bin/sh
set -e

echo "Starting Famsub API..."
echo "Connecting to PostgresSQL database..."
until nc -z -v -w30 postgres 5432
do
  echo "Waiting for database connection..."
  sleep 5
done

# Run database migrations if they exist
if [ -f "./package.json" ] && grep -q '"migration:run"' "./package.json"; then
    echo "Running database migrations..."
    pnpm migration:run || echo "No migrations to run or migration failed (continuing...)"
fi

# Run database seeds if they exist
if [ -f "./package.json" ] && grep -q '"seed"' "./package.json"; then
    echo "Running database seeds..."
    node dist/database/seed-runner.js || echo "No seeds to run or seeding failed (continuing...)"
fi

echo "Starting the NestJS API application..."
exec node dist/main.js