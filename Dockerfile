FROM node:alpine3.16
WORKDIR /usr/src/app
COPY . .
RUN npm i
CMD ["npm", "run", "start:dev"]
