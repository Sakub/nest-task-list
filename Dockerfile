FROM node:19

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

