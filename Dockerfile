# --- Сборка фронтенда ---
FROM node:22-alpine AS builder

WORKDIR /app

# Кэшируем зависимости
COPY package*.json ./
RUN npm install

# Копируем проект и собираем
COPY . .
RUN npm run build

# --- Финальный образ ---
FROM alpine:3.18 AS runner

WORKDIR /app

CMD cp -r /app/dist ./dist
# Копируем только статику

# На выходе: минимальный образ с папкой dist
