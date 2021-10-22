FROM node:14

USER node

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV HOME=/home/node

WORKDIR $HOME/app

RUN npm i -g npm@latest

RUN npm install -g @angular/cli@latest && npm cache clean --force
RUN npm install --save-dev @angular-devkit/build-angular
RUN npm install --save

EXPOSE 4200

CMD [ "node" ]