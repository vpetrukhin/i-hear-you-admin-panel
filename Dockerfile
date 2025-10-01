# --- Сборка фронтенда ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- Финальный образ с Nginx ---
FROM nginx:1.27-alpine AS runner

# Удаляем дефолтный html
RUN rm -rf /usr/share/nginx/html/*

# Копируем собранный фронт
COPY --from=builder /app/dist /usr/share/nginx/html

# Кладём свой nginx.conf (если нужен кастом)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
