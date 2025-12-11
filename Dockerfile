FROM node:20-alpine AS dependencies
COPY . /app
WORKDIR ${FOLDER}
RUN npm ci

FROM node:20-alpine AS build
COPY --from=dependencies . /app
WORKDIR ${FOLDER}
RUN npm run build

FROM node:20-alpine
COPY --from=build . /app
WORKDIR ${FOLDER}
CMD ["npm", "run", "start"]