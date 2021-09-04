##
## CLIENT BUILD STAGE

FROM node:lts AS build-client
WORKDIR usr/src/build
ENV NODE_ENV production

# copy and install all workspace packages
COPY .yarn ./.yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY package.json .
COPY ./client/package.json ./client/package.json 
RUN yarn plugin import workspace-tools
RUN yarn install

# copy app source and build
COPY ./client ./client
RUN yarn workspace client build