FROM node:16-bullseye-slim
RUN apt-get update && \
    apt-get install -y bash jq build-essential python-is-python3 python3-pip openssl libssl-dev pkg-config && \
    apt-get clean
WORKDIR /edumeet
ENV DEBUG=edumeet*,mediasoup*
RUN npm install -g nodemon && \
    npm install -g concurrently
RUN touch /.yarnrc && mkdir -p /.yarn /.cache/yarn && chmod -R 775 /.yarn /.yarnrc /.cache
CMD concurrently --names "app ,server" \
    "cd app && yarn && yarn build && yarn start"
     "cd server && yarn && yarn build && yarn start" \