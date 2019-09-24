FROM node:8.4

COPY . /app

WORKDIR /app

RUN npm install --silent && npm install ./frontend/ && npm install ./frontend/ --unsafe-perm node-sass

EXPOSE 3000/tcp

CMD ["npm", "run", "dev"]