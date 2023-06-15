FROM node:18

WORKDIR /app/

COPY package*.json /

RUN npm install prettier -g

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

# Development
CMD ["node", "build/server.js"]