# Stage 1 – Build
FROM node:20.0-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Injeta a variável de ambiente dentro do container de build
ARG REACT_APP_CHAT_API_URL
RUN printf 'REACT_APP_CHAT_API_URL="%s"\n' "$REACT_APP_CHAT_API_URL" > .env

RUN npm run build

# Stage 2 – Serve (opcional)
FROM node:20.0-alpine AS serve
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
