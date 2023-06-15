import dotenv from 'dotenv';
dotenv.config();
import App from './app/App';
import { Request, Response } from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { CrawData } from './job/CrawData';

export const isDevelopment = process.env.APP_ENV === 'local' ? true : false;

// ********************* BaseJob *********************//
new CrawData().runJob();

// ********************* Config Server *********************//
const APP_PORT: string | number = process.env.APP_PORT;
const httpServer: http.Server = http.createServer(App);

new Server(httpServer, { cors: { origin: process.env.APP_URL, credentials: true } });

if (isDevelopment) {
  App.get('/', (req: Request, res: Response) => {
    res.send('Server is Running ...');
  });
}

httpServer.listen(APP_PORT, () => {
  console.log(`Running API on port : ${APP_PORT}`);
});
