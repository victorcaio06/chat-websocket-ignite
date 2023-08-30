import { Message } from '../schemas/Message';

export class GetMessagesByChatRoomService {
  async execute(roomId: string) {
    const messages = await Message.find({
      room_id: roomId,
    }).populate('to').exec();

    return messages;
  }
}
