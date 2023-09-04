import { GetChatRoomByIdService } from '../services/get-chat-room-by-id.service';

export function makeGetChatRoomByIdService() {
  const getChatRoomByIdService = new GetChatRoomByIdService();

  return getChatRoomByIdService;
}
