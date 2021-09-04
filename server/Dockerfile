##
## SERVER BUILD STAGE

FROM node:lts AS build-server
WORKDIR usr/src/build
ENV NODE_ENV production

# copy and install all workspace packages
COPY .yarn ./.yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY package.json .
COPY ./server/package.json ./server/package.json 
RUN yarn plugin import workspace-tools
RUN yarn install

# copy app source and build
COPY ./server ./server
RUN yarn workspace server build