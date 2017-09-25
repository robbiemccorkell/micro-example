FROM node:8

# grab gosu for easy step-down from root
RUN gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates wget && rm -rf /var/lib/apt/lists/* \
	&& wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/1.2/gosu-$(dpkg --print-architecture)" \
	&& wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/1.2/gosu-$(dpkg --print-architecture).asc" \
	&& gpg --verify /usr/local/bin/gosu.asc \
	&& rm /usr/local/bin/gosu.asc \
	&& chmod +x /usr/local/bin/gosu \
	&& apt-get purge -y --auto-remove ca-certificates wget

ENV HOME /home/app
ENV APP_DIR $HOME/src

RUN groupadd -r app && useradd -rmg app app
RUN chown -R app:app $HOME

# Create app directory
WORKDIR $APP_DIR

# Install app dependencies
COPY package.json yarn.lock $APP_DIR/

RUN yarn

# Bundle app source
COPY . $APP_DIR/

EXPOSE 8080
CMD [ "npm", "start" ]