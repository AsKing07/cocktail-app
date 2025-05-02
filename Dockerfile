FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
RUN npm install -g http-server
CMD ["http-server", "dist/cocktail-app", "-p", "8080"]








