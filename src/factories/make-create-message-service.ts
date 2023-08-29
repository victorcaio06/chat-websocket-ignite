import { CreateMessageService } from '../services/create-message.service';

export function makeCreateMessageService() {
  const createMessageService = new CreateMessageService();

  return createMessageService;
}
