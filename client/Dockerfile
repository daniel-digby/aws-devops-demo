##
## CLIENT BUILD STAGE
FROM build-base as build-client
WORKDIR .
ENV NODE_ENV production

# copy and install all workspace packages
COPY ./client/package.json ./client/package.json 
RUN yarn install

# # copy source and build
COPY ./client ./client
RUN yarn workspace client build
