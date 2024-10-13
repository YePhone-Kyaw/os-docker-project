FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

COPY . .

ENV PORT=5432

EXPOSE 5432


CMD [ "npm", "start" ]