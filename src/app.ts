import express, { Application } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import path from 'path';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { connectMongoDb } from './infra/database/mongodb';
import { errorMiddleware } from './middlewares/error.middleware';

export class App {
  private static instance: App;

  private app: Application;
  public http: http.Server;
  public io: Server;

  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
    this.io = new Server(this.http);

    this.middlewaresInitialize();
    this.interceptionError();
    this.initializeHtml();
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
    this.http.listen(3333, async () => {
      try {
        dotenv.config();

        await connectMongoDb();
        console.log('🚀 ~ Server is running on port 3333');
      } catch (error) {
        console.log(
          '🚀 ~ file: app.ts:48 ~ App ~ this.http.listen ~ error:',
          error
        );
      }
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

  private middlewaresInitialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private interceptionError() {
    this.app.use(errorMiddleware);
  }
}
