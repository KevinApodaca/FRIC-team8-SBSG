FROM node:latest
WORKDIR /app
COPY . /app
RUN npm intall
# Starting the backend services
ENV VUE_APP_API_HOST localhost
ENV VUE_APP_API_PORT 3000
EXPOSE 8080
CMD npm run serve
