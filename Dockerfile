FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install -g @angular/cli

RUN npm install


CMD ["ng", "serve", "-open" , "--port", "4500"]