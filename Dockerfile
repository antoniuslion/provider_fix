FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
VOLUME [ "/usr/src/app" ]
COPY package*.json ./
RUN npm install
COPY . . 

# ENV NODE_ENV=development
# ENV DATABASE=mongodb://mongodb:27017/provider
# ENV PORT=7000

EXPOSE 7000
CMD [ "npm", "start" ]