# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
CMD ["node", "frontend/kbcoding/src/index.html"]
EXPOSE 3000