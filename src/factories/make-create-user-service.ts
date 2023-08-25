import { CreateUserService } from '../services/create-user.service';

export function makeCreateUserService() {
  const createUserService = new CreateUserService();

  return createUserService;
}
