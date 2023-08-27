import { User } from '../schemas/User';

export class GetUserBySocketId {
  async execute(socketId: string) {
    const getUserBySocketId = await User.findOne({ socket_id: socketId });

    return getUserBySocketId;
  }
}
