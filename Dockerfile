FROM node:18-alpine AS base

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]