FROM node:14

WORKDIR /class_build/
COPY . /class_build/

RUN yarn install
RUN yarn build
CMD yarn start