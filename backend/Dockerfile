FROM node:22-alpine AS backend-builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS backend-production
WORKDIR /app
COPY --from=backend-builder /app/package*.json .
RUN npm ci --omit=dev

COPY --from=backend-builder /app/dist ./dist
COPY --from=backend-builder /app/src/public ./dist/public

#for tests
RUN mkdir /app/src
COPY --from=backend-builder /app/src/public /app/src/public
RUN mkdir -p /app/src/public/images
RUN mkdir -p /app/src/public/temp
RUN mkdir -p /app/dist/public/images
RUN mkdir -p /app/dist/public/temp

EXPOSE 3000
CMD [ "node", "dist/app.js" ]
