FROM node:20-alpine

WORKDIR /home/node/app

COPY package*.json ./ 

# COPY ./init-db/init.sql ./docker-entrypoint-initdb.d/
# COPY ./init-db/init.sql ./docker-entrypoint-initdb.d/init.sql

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
