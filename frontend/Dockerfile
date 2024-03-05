FROM node:latest
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
EXPOSE 5173
CMD [ "yarn", "dev" ]