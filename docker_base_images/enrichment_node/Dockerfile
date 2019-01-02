
FROM node:8.12.0-alpine

RUN apk add git python make g++ yarn

COPY start.sh /

USER node

WORKDIR /opt/nodeapp

CMD /start.sh


