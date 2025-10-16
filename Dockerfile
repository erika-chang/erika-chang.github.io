# Stage 1 – Build
FROM node:20.0-alpine AS build
WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante
COPY . .

# >>> Patch: não quebrar o build se o Medium der erro
# Substitui o throw de erro do Medium por um console.warn
RUN sed -i 's/throw new Error(ERR.requestMediumFailed);/console.warn("Medium fetch failed (non-blocking)");/' fetch.js

# Faz o build de produção
RUN npm run build

# Stage 2 – Servir (opcional p/ testar localmente)
FROM node:20.0-alpine AS serve
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
