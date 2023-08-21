import express, { Application } from 'express';
import http, { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

export class App {
  private static instance: App;

  private app: Application;
  public http: http.Server;
  public io: Server;

  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
    this.io = new Server(this.http);

    this.initializeHtml()
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }

    return App.instance;
  }

  public listenExpressServer() {
    this.app.listen(3333, () => {
      console.log('🚀 Server is running on port 3333');
    });
  }

  public listenHttpServer() {
    this.http.listen(3333, () => {
      console.log('🚀 Server is running on port 3333');
    });
  }

  public openConnectionWebSocket() {
    this.io.on('connection', (socket) => {
      console.log(
        '🚀 ~ file: app.ts:27 ~ App ~ this.io.on ~ socket:',
        socket.id
      );
    });
  }

  private initializeHtml() {
    this.app.use(express.static(path.join(__dirname, '..', 'public')));
  }
}
