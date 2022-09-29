FROM node:16.17-alpine3.15
ENV DBURL=mongodb://myRootUser:myPassword@localhost:27017
RUN mkdir -p /home/app
COPY package.json /home/app
RUN npm install
COPY . /home/app
CMD [ "nodemon", "src/app.ts" ]