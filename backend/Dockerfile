FROM node:latest
WORKDIR /usr/src/app
COPY package.json yarn.lock prisma ./
RUN yarn --frozen-lockfile
COPY . .
EXPOSE 3000
CMD [ "yarn", "start:prod" ]