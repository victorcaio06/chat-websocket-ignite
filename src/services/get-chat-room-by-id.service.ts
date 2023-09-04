import { ChatRoom } from '../schemas/Chat-room';

export class GetChatRoomByIdService {
  async execute(id: string) {
    const room = await ChatRoom.findOne({
      id_chat_room: id,
    }).populate('id_users');

    return room;
  }
}
