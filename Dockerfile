# Stage 1 – Build
FROM node:20.0-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Evita quebrar caso Medium retorne 500
RUN sed -i 's/throw new Error(ERR.requestMediumFailed);/console.warn("Medium fetch failed (non-blocking)");/' fetch.js

RUN npm run build

# Stage 2 – Servir local (opcional)
FROM node:20.0-alpine AS serve
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
