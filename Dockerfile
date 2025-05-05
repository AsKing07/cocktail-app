# Étape 1 - Build Angular SSR
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 - Image finale pour exécution
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 4000

CMD ["node", "dist/cocktail-app/server/server.mjs"]
