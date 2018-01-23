FROM node:9.2

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json .
RUN npm install

RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2 \
 && tar xvjf phantomjs-1.9.8-linux-x86_64.tar.bz2 \
 && mv phantomjs-1.9.8-linux-x86_64/bin/phantomjs /usr/local/bin/ \
 && rm -f phantomjs-1.9.8-linux-x86_64.tar.bz2 && rm -rf phantomjs-1.9.8-linux-x86_64/bin/phantomjs

COPY . /usr/app
RUN apt-get install -y libfreetype6 libfreetype6-dev libfontconfig1 libfontconfig1-dev
ENV PHANTOMJS_BIN /usr/local/bin/phantomjs
CMD ["npm", "test"]