FROM node:12.14.0-buster

#WORKDIR /angular_project

#RUN pwd

#ENV PATH /angular_project/node_modules/.bin:$PATH

RUN npm install -g @angular/cli --unsafe
RUN ng new ngproject
WORKDIR ngproject
RUN pwd

#RUN copy . /ngproject
#RUN echo 'location >>>'
#RUN pwd

CMD ng serve --host 0.0.0.0
