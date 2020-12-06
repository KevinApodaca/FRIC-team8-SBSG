FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install
RUN npm install --save-dev @babel/cli

# MongoDB Instance
ENV DATABASE_HOSTNAME 127.0.0.1

EXPOSE 3000

CMD npm start
