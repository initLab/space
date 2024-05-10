FROM node:18-alpine

RUN apk add --no-cache make gcc g++ bash git python3 py3-pip

WORKDIR /etc/app

COPY package.json package.json
COPY yarn.lock .
RUN yarn

# copy files
COPY src .
COPY public .
COPY index.html .
COPY vite.config.js .
COPY .env.development .

# RUN bash bin/build.sh

CMD ["yarn", "dev"]
