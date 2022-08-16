FROM node:16.16-alpine AS development
WORKDIR /app
COPY ./package*.json ./
RUN npm install
RUN chown -R node /root
RUN chown node node_modules
CMD ["npm", "start"]