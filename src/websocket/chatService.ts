import { App } from '../app';

const { io } = App.getInstance();

io.on('connection', (socket) => {
  socket.emit('chat_iniciado', {
    message: 'Você conseguiu iniciar',
  });
});
