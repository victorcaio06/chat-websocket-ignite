import { App } from '../app';
import { makeCreateChatRoomService } from '../factories/make-create-chat-room-service';
import { makeCreateUserService } from '../factories/make-create-user-service';
import { makeGetAllUsersService } from '../factories/make-get-all-users-service';
import { makeGetUserBySocketIdService } from '../factories/make-get-user-by-socket-id-service';

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
    const getAllUsersService = makeGetAllUsersService();

    const users = await getAllUsersService.execute();

    callback(users);
  });

  socket.on('start_chat', async (data, callback) => {
    console.log('🚀 ~ file: chatService.ts:34 ~ socket.on ~ data:', data);
    const createChatRoomService = makeCreateChatRoomService();

    const getUserBySocketIdService = makeGetUserBySocketIdService();

    const userLogged = await getUserBySocketIdService.execute(socket.id);

    const room = await createChatRoomService.execute([
      data.idUser,
      userLogged._id,
    ]);

    console.log('🚀 ~ file: chatService.ts:44 ~ socket.on ~ room:', room);

    callback({ room });
  });
});
