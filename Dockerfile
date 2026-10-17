FROM node:24-alpine3.23@sha256:e44c87c7dd212720eb00469aeac89504ca2be77b8f0d6dbffb30665d5fcc59e1 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html vite.config.ts tsconfig*.json ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine-slim@sha256:4ac59c85c8c46d9e91eaabd2122cda4923ba380cf11f4138e389f069bcdc77a3 AS runtime

COPY deploy/nginx-container.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
RUN nginx -t

USER 101:101
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=6 CMD wget --spider -q http://127.0.0.1:8080/healthz || exit 1