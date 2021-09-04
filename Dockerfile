##
## BASE BUILD STAGE
FROM node:lts AS build-base
WORKDIR usr/src/
COPY .yarn ./.yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY package.json .

# copy and install all workspace packages
RUN yarn plugin import workspace-tools

# ##
# ## CLIENT BUILD STAGE
# FROM build-base as build-client
# WORKDIR usr/src/
# ENV NODE_ENV production

# # copy and install all workspace packages
# COPY ./client/package.json ./client/package.json 
# # RUN yarn install

# # # copy source and build
# # COPY ./client ./client
# # RUN yarn workspace client build