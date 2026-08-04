FROM node:26-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

CMD ["npm","run","start"]