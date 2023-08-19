import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

export class App {
  public app: Application;
  public oi: Server;

  constructor() {
    this.app = express();
    this.listen();
    this.createServerWebSocket();
  }

  public listen() {
    this.app.listen(3333, () => {
      console.log('🚀 Server is running on port 3333');
    });
  }

  public createServerHttp() {
    return createServer(this.app);
  }

  public createServerWebSocket() {
    return new Server(this.createServerHttp());
  }
}
