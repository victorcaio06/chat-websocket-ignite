import { GetChatRoomByUsersService } from '../services/get-chat-room-by-users.service';

export function makeGetChatRoomByUsersService() {
  const getChatRoomByUsersService = new GetChatRoomByUsersService();

  return getChatRoomByUsersService;
}
