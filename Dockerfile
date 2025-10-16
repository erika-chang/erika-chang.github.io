# Stage 1 – Build
FROM node:20.0-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# (Opcional): se seu fetch.js ainda tem throw do Medium, evita quebrar o build
RUN sed -i 's/throw new Error(ERR.requestMediumFailed);/console.warn("Medium fetch failed (non-blocking)");/' fetch.js || true

# Remove qualquer tentativa de rodar fetch no build
RUN sed -i 's/node fetch.js && //g' package.json

RUN npm run build

# Stage 2 – Serve (apenas para teste local)
FROM node:20.0-alpine AS serve
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
