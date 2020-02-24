FROM node:12

RUN apt-get update && \
  apt-get -y install xvfb gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
  libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
  libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
  libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
  libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget && \
  rm -rf /var/lib/apt/lists/*

USER node
RUN mkdir -p /home/node/ageage-db
WORKDIR /home/node/ageage-db

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./yarn.lock .
COPY --chown=node:node ./lerna.json .
RUN yarn
COPY --chown=node:node ./apps/crawler/package.json ./apps/crawler
COPY --chown=node:node ./apps/web/package.json ./apps/web/
RUN yarn lerna bootstrap

COPY --chown=node:node . .

