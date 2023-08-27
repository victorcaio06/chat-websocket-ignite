import { App } from '../app';
import { makeCreateUserService } from '../factories/make-create-user-service';
import { makeGetAllUsersService } from '../factories/make-get-all-users-service';

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

    socket.broadcast.emit('new_users', user);
  });

  socket.on('get_users', async (callback) => {
    const getAllUsersService =  makeGetAllUsersService();

    const users = await getAllUsersService.execute();

    callback(users);
  });
});
