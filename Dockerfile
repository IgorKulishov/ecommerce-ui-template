FROM node:12.2.0
WORKDIR /appENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@^8.1.0

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0
