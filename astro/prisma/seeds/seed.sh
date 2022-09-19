#!/bin/sh
set -ex
cd prisma/seeds
psql $DATABASE_URL -f records.sql
