FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install --global smee-client
ENTRYPOINT ["node","bin/smee.js"]
CMD ["--help"]
