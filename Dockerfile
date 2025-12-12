FROM node:22-alpine AS builder

COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

CMD ["echo", "Frontend built successfully"]

FROM nginx:stable-alpine

COPY --from=builder /dist /usr/share/nginx/html
COPY --from=builder nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]
