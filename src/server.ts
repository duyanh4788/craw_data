import dotenv from 'dotenv';
dotenv.config();
import App from './app/App';
import { Request, Response } from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { CrawData } from './job/CrawData';
import { sequelize } from './infrastructure/sequelize';

export const isDevelopment = process.env.APP_ENV === 'local' ? true : false;

// ********************* Connect DataBase *********************//
sequelize.sync({ force: false, alter: false });

// ********************* BaseJob *********************//
new CrawData().runJob();

// ********************* Config Server 8000*********************//
const APP_PORT: string | number = process.env.APP_PORT_SERVER;
const httpServer: http.Server = http.createServer(App);

new Server(httpServer, { cors: { origin: process.env.APP_URL_RMQ_RECEIVED, credentials: true } });

if (isDevelopment) {
  App.get('/', (req: Request, res: Response) => {
    res.send('Server is Running ...');
  });
}

httpServer.listen(APP_PORT, () => {
  console.log(`Running API on port : ${APP_PORT}`);
});
