_default:
  @just --list --unsorted


build:
  @docker compose -f compose.yml build

update:
  @docker compose -f compose.yml build --pull --no-cache

up:
  @docker compose -f compose.yml up

down:
  @docker compose -f compose.yml down

clean:
  @docker compose -f compose.yml down --volumes --remove-orphans

backend-sh:
  @docker compose -f compose.yml run --rm --user 1000:1000 --service-ports backend bash

frontend-sh:
  @docker compose -f compose.yml run --rm --service-ports frontend bash

postgres-migrate:
  @docker compose -f compose.yml exec backend npm run migrate

postgres-sh:
  @docker compose -f compose.yml exec postgres psql -U postgres
