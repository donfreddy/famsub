# Here we are getting our node as Base image
FROM node:20-alpine

# create user in the docker image
USER node

# Creating a new directory for app files and setting path in the container
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# setting working directory in the container
WORKDIR /home/node/app

# grant permission of node project directory to node user
COPY --chown=node:node . .

# installing the dependencies into the container
RUN yarn install

COPY docker-entrypoint.sh ./

# grant permission to execute the entrypoint script
USER root
RUN chmod +x docker-entrypoint.sh && \
    apk add --no-cache netcat-openbsd
USER node

# container exposed network port number
EXPOSE 4000

# command to run within the container
CMD ["./docker-entrypoint.sh"]