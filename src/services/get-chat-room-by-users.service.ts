import { ObjectId } from 'mongoose';
import { ChatRoom } from '../schemas/Chat-room';

export class GetChatRoomByUsersService {
  async execute(idUsers: ObjectId[]) {
    const room = await ChatRoom.findOne({
      id_users: { $all: idUsers },
    });

    return room;
  }
}
