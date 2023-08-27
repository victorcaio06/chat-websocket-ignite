import { ChatRoom } from '../schemas/Chat-room';

export class CreateChatRoomService {
  async execute(idUsers: string[]) {
    const room = await ChatRoom.create({ id_users: idUsers });

    return room
  }
}
