FROM node:20-alpine AS build

USER node

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev

FROM node:20-alpine AS main

USER node

WORKDIR /app

COPY --from=build /app/ .
COPY --chown=node:node . .

EXPOSE 5000

CMD ["npm","run","start:prod"]
