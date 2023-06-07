# syntax=docker/dockerfile:1

FROM node:18-alpine
COPY . .
RUN npm install
CMD npm run start
EXPOSE 3000