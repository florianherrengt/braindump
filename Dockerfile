FROM node:12

WORKDIR /home

COPY . .

RUN yarn
