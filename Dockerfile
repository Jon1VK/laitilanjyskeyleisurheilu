FROM node:18.15-alpine AS base
RUN apk add openssl
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/laitjy/.pnpm
ENV PATH=$PATH:$PNPM_HOME
WORKDIR /laitjy
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . .
RUN pnpm install -r --prefer-offline
RUN pnpm add -g turbo

FROM base as db-migrate
RUN apk add postgresql-client
WORKDIR /laitjy/packages/db
CMD ["pnpm", "db:migrate:dev"]

FROM base as db-studio
WORKDIR /laitjy/packages/db
CMD ["pnpm", "db:studio"]

FROM base AS web-dev
WORKDIR /laitjy/apps/web
CMD ["pnpm", "dev"]