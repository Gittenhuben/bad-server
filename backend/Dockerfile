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

#RUN mkdir /app/dist
#RUN mkdir /app/dist/public
#RUN mkdir /app/dist/public/images
#RUN mkdir /app/dist/public/temp

RUN mkdir /app/src
RUN mkdir /app/src/public
RUN mkdir /app/src/public/images
RUN mkdir /app/src/public/temp


COPY --from=backend-builder /app/dist ./dist
COPY --from=backend-builder /app/src/public ./dist/public

#for tests
#RUN mkdir /app/src
COPY --from=backend-builder /app/src/public /app/src/public
#RUN mkdir /app/src/public/temp

EXPOSE 3000
CMD [ "node", "dist/app.js" ]
