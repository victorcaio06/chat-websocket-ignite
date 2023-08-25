import { User } from '../schemas/User';

interface CreateUserDTO {
  name: string;
  email: string;
  socket_id: string;
  avatar: string;
}

export class CreateUserService {
  async execute({ name, email, socket_id, avatar }: CreateUserDTO) {
    const userAlreadyExists = await User.findOne({ email }).exec();

    if (userAlreadyExists) {
      const user = await User.findOneAndUpdate(
        {
          _id: userAlreadyExists._id,
        },
        { $set: { socket_id, avatar, name } },
        { new: true }
      );

      return user;
    } else {
      const user = await User.create({ name, email, avatar, socket_id });

      return user;
    }
  }
}
