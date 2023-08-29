import mongoose, { Document } from 'mongoose';
import { randomUUID } from 'node:crypto';

import { User } from './User';

type ChatRoom = Document & {
  id_users: User[];
  id_chat_room: string;
};

const ChatRoomSchema = new mongoose.Schema({
  id_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  id_chat_room: { type: String, default: randomUUID() },
});

const ChatRoom = mongoose.model<ChatRoom>('ChatRoom', ChatRoomSchema);

export { ChatRoom };
