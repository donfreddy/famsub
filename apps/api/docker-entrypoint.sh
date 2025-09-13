#!/bin/sh

echo "Waiting for PostgresSQL to start..."
until nc -z -v -w30 postgres 5432
do
  echo "Waiting for database connection..."
  sleep 5
done

yarn install
yarn build

#if [ -f "$(pwd)/package.json" ] && cat "$(pwd)/package.json" | grep -q "migration:run"; then
#  echo "Running migrations..."
#  yarn migration:run
#fi

echo "Running seeds..."
yarn seed

echo "Starting the application..."
exec node  dist/src/main.js