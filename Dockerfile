# Dockerfile (repo root)
# Stage 1 — build
FROM node:18 AS build
WORKDIR /app
COPY my-app/package.json my-app/package-lock.json* ./
RUN npm ci
COPY my-app/. .
RUN npm run build

# Stage 2 — serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
