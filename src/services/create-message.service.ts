import { Message } from '../schemas/Message';

interface CreateMessageDTO {
  to: string;
  text: string;
  roomId: string;
}

export class CreateMessageService {
  async execute({ to, text, roomId }: CreateMessageDTO) {
    const message = await Message.create({
      to,
      text,
      room_id: roomId,
    });

    return message;
  }
}
