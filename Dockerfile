# BUILD STAGE

FROM node:lts AS build
WORKDIR usr/src/build
ENV NODE_ENV production

# copy and install all workspace packages
COPY */package*.json .
COPY */yarn* . 
COPY .yarn .
COPY .yarnrc.yml .
RUN npm install -g yarn@3.0.0.cjs -f
RUN yarn set version latest
RUN yarn plugin import workspace-tools
RUN yarn install

# copy app source and build
COPY . .
RUN yarn build