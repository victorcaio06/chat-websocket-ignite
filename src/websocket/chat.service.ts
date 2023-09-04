import { App } from '../app';
import { makeCreateChatRoomService } from '../factories/make-create-chat-room-service';
import { makeCreateMessageService } from '../factories/make-create-message-service';
import { makeCreateUserService } from '../factories/make-create-user-service';
import { makeGetAllUsersService } from '../factories/make-get-all-users-service';
import { makeGetChatRoomByIdService } from '../factories/make-get-chat-room-by-id-service';
import { makeGetChatRoomByUsersService } from '../factories/make-get-chat-room-by-users-service';
import { makeGetMessagesByChatRoomService } from '../factories/make-get-messages-by-chat-room-service';
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

    const getMessagesByChatRoomService = makeGetMessagesByChatRoomService();

    const userLogged = await getUserBySocketIdService.execute(socket.id);

    const getChatRoomByUsersService = makeGetChatRoomByUsersService();

    let room = await getChatRoomByUsersService.execute([
      data.idUser,
      userLogged.id,
    ]);

    if (!room) {
      room = await createChatRoomService.execute([data.idUser, userLogged._id]);
    }

    socket.join(room.id_chat_room);

    const messages = await getMessagesByChatRoomService.execute(
      room.id_chat_room
    );

    callback({ room, messages });
  });

  socket.on('message', async (data) => {
    const getUserBySocketIdService = makeGetUserBySocketIdService();

    const user = await getUserBySocketIdService.execute(socket.id);

    const createMessageService = makeCreateMessageService();

    const message = await createMessageService.execute({
      to: user._id,
      text: data.message,
      roomId: data.idChatRoom,
    });

    io.to(data.idChatRoom).emit('message', {
      message,
      user,
    });

    const getChatRoomByIdService = makeGetChatRoomByIdService();

    const chatRoom = await getChatRoomByIdService.execute(data.idChatRoom);

    const userFrom = chatRoom.id_users.find((data) => data._id !== user._id);

    io.to(userFrom.socket_id).emit('emitNotification', {
      newMessage: true,
      roomId: data.idChatRoom,
      from: user,
    });
  });
});
