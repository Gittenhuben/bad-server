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

COPY --from=backend-builder /app/dist ./src
COPY --from=backend-builder /app/src/public ./src/public

#for tests
#RUN mkdir ./src
RUN mkdir -p ./src/public/images
RUN mkdir -p ./src/public/temp

EXPOSE 3000
CMD [ "node", "src/app.js" ]
