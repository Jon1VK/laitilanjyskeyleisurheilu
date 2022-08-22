FROM node:16.17 AS base
RUN apt-get update && apt-get install -y openssl
WORKDIR /app
COPY ./package*.json ./
RUN npm install
RUN chown -R node /root
RUN chown -R node node_modules

FROM base as prisma-migrate
CMD ["npm", "run", "prisma", "migrate", "dev"]

FROM base as prisma-studio
CMD ["npm", "run", "prisma", "studio"]

FROM base AS development
CMD ["npm", "run", "dev"]