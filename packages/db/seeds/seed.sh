#!/bin/sh
set -ex
cd prisma/seeds
psql $DATABASE_URL -f users.sql
psql $DATABASE_URL -f athleteProfiles.sql
psql $DATABASE_URL -f records.sql
