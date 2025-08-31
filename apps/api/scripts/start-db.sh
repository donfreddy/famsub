#!/bin/bash

# This script is used to start the database server.
# type `sh start-db.sh` in the terminal.
# Or: `docker run --name postgres_famsub -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=jointly_db -d postgres`

# Remove address already in use error message
# `sudo ss -lptn 'sport = :5432'` and then `kill <pid>`

set -e

SERVER="postgres_famsub";
PW="Secret548UOLPassword";
DB="famsub_db";
VOLUME_NAME="postgres_famsub_data";

echo "Stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
(docker rm $SERVER || :) && \
(docker run --name $SERVER -p 15432:5432 \
  -e POSTGRES_PASSWORD=$PW \
  -e POSTGRES_DB=$DB \
  -v $VOLUME_NAME:/var/lib/postgresql/data \
  -d postgres || :) && \

  # wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 3;

# Create database if not exists
(docker exec -i $SERVER psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB'" | grep -q 1) || \
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres;

echo "\l" | docker exec -i $SERVER psql -U postgres
