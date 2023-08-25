import { App } from '../app';
import { makeCreateUserService } from '../factories/make-create-user-service';

const { io } = App.getInstance();

io.on('connection', (socket) => {
  socket.on('start', async (data) => {
    const { name, email, avatar } = data;

    const createUserService = makeCreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      avatar,
      socket_id: socket.id,
    });

    console.log('🚀 ~ file: chatService.ts:18 ~ socket.on ~ user:', user);
  });
});
