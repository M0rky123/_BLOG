FROM node:18-alpine

WORKDIR /app

COPY ./backend/package.json ./backend/package-lock.json ./

RUN npm ci

COPY ./backend ./

EXPOSE 5000

CMD ["npm", "run", "start"]
