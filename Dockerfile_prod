FROM node:10.16.0

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN yarn install

COPY ./ /app

RUN yarn run build

# ENV NODE_PATH /app/node_modules/
# ENV NODE_PATH /usr/lib/node_modules/

ENTRYPOINT ["yarn", "run", "start"]
