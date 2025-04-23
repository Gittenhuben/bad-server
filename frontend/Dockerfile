FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM alpine
WORKDIR /app/frontend
COPY --from=frontend-builder /app/dist ./dist_local
CMD [ "sh", "-c", "rm -r -f dist/* ; cp -r dist_local/. dist/" ]
