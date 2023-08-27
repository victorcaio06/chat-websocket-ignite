import { User } from '../schemas/User';

export class GetAllUsersService {
  async execute() {
    const getAllUsers = await User.find();

    return getAllUsers;
  }
}
