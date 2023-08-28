import { App } from './app';

import './websocket/chat.service';

const app = App.getInstance();

app.listenHttpServer();
app.openConnectionWebSocket();
