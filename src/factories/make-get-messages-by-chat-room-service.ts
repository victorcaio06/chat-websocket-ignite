import { GetMessagesByChatRoomService } from '../services/get-messages-by-chat-room.service';

export function makeGetMessagesByChatRoomService() {
  const getMessagesByChatRoomService = new GetMessagesByChatRoomService();

  return getMessagesByChatRoomService;
}
