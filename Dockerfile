FROM node:9.2

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . /usr/app
CMD ["npm", "test"]