##
## SERVER BUILD STAGE
FROM build-base as build-server
WORKDIR .
ENV NODE_ENV production

# copy and install all workspace packages
COPY ./server/package.json ./server/package.json 
RUN yarn install

# # copy source and build
COPY ./server ./server
RUN yarn workspace server build
