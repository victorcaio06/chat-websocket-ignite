import { App } from '../app';
import { makeCreateChatRoomService } from '../factories/make-create-chat-room-service';
import { makeCreateUserService } from '../factories/make-create-user-service';
import { makeGetAllUsersService } from '../factories/make-get-all-users-service';
import { makeGetChatRoomByUsersService } from '../factories/make-get-chat-room-by-users-service';
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
    const createChatRoomService = makeCreateChatRoomService();

    const getUserBySocketIdService = makeGetUserBySocketIdService();

    const userLogged = await getUserBySocketIdService.execute(socket.id);

    const getChatRoomByUsersService = makeGetChatRoomByUsersService();

    let room = await getChatRoomByUsersService.execute([
      data.idUser,
      userLogged.id,
    ]);

    if (!room) {
      room = await createChatRoomService.execute([data.idUser, userLogged._id]);
    }

    callback({ room });
  });
});
