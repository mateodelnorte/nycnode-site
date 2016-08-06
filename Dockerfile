# http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html
# latest LTS version as of 7/29/16
FROM node:6.3.1

# We create an unprivileged user, prosaically called app, to run the app inside
# the container. If you don’t do this, then the process inside the container
# will run as root, which is against security best practices and principles.
# We also install the latest version of npm
RUN useradd --user-group --create-home --shell /bin/false app && \
  npm i -g supervisor

ENV HOME=/home/app

# First copy over the package.json and npm-shrinkwrap.json files
#
# NOTE:
# We could COPY the whole application folder on the host into $HOME/site,
# rather than just the packaging files, but we can save some time on our docker
# builds by only copying in what we need at this point, and copying in the rest
# after we run npm install. This takes better advantage of docker build’s layer
# caching.
COPY package.json $HOME/site/
# Files copied into the container with the COPY command end up being owned by
# root inside of the container, which means that our unprivileged app user can’t
# read or write them, which it will not like. So, we simply chown them to app
# after copying.
RUN chown -R app:app $HOME/*

# Change user to app, and enter the site's directory
USER app
WORKDIR $HOME/site

# Install npm dependencies
RUN npm install

# start the app
CMD ["supervisor", "keystone"]

# expose the docker container port to the host
EXPOSE 3000
