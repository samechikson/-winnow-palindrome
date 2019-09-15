FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install --production && npm install typescript

COPY --chown=node:node . .

RUN npm run build

RUN ls -la /home/node/app

CMD [ "npm", "start"]