FROM node:9.2

RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 \
 && tar xvjf phantomjs-2.1.1-linux-x86_64.tar.bz2 \
 && mv phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/ \
 && rm -f phantomjs-2.1.1-linux-x86_64.tar.bz2 && rm -rf phantomjs-2.1.1-linux-x86_64/bin/phantomjs
RUN apt-get install -y libfreetype6 libfreetype6-dev libfontconfig1 libfontconfig1-dev
ENV PHANTOMJS_BIN /usr/local/bin/phantomjs

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json .
RUN npm install



COPY . /usr/app

CMD ["npm", "test"]