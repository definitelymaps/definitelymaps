FROM node:16-alpine

USER 1000
RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node .npmrc ./
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig*.json ./

RUN npm ci --loglevel warn --build-from-source

COPY --chown=node:node . .

RUN npm run build

EXPOSE 5000
CMD [ "npm", "run", "migrate-and-start" ]
