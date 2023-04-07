FROM node:18.15-alpine AS base
RUN apk add openssl
WORKDIR /app
COPY ./package*.json ./
RUN npm install
RUN chown -R node /root
RUN chown -R node node_modules

FROM base as prisma-migrate
RUN apk add postgresql-client
CMD ["npm", "run", "prisma", "migrate", "dev"]

FROM base as prisma-studio
CMD ["npm", "run", "prisma", "studio"]

FROM base AS development
CMD ["npm", "run", "dev"]