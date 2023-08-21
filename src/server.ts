import { App } from './app';
import './websocket/chatService';

const app = App.getInstance();

app.listenHttpServer();
app.openConnectionWebSocket();
