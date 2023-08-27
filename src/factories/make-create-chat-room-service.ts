import { CreateChatRoomService } from '../services/create-chat-room.service';

export function makeCreateChatRoomService() {
  const createChatRoomService = new CreateChatRoomService();

  return createChatRoomService;
}
