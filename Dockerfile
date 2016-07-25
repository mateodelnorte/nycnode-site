FROM node

MAINTAINER Patrick Scott <pat@patscott.io>

# copy the app files to the /app folder
COPY . /app

WORKDIR /app

# grab all dependencies
RUN npm install

# start the app
CMD ["node", "keystone"]

EXPOSE 3000
