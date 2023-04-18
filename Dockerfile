FROM node:18.12.0-alpine3.15

ARG DK_UID=1000

ARG DK_GID=1000

ENV CLI_PATH='./dist/cli.js'

RUN apk --no-cache add shadow bash && \
  usermod -u ${DK_UID:-1000} node && \
  groupmod -g ${DK_GID:-1000} node

USER node

RUN mkdir /home/node/project

WORKDIR /home/node/project
