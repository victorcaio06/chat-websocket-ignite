import { GetAllUsersService } from '../services/get-all-user.service';

export function makeGetAllUsersService() {
  const getAllUsersService = new GetAllUsersService();

  return getAllUsersService;
}
