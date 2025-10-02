FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Фронтенд только собирается, не запускает сервер
CMD ["echo", "Frontend built successfully"]
