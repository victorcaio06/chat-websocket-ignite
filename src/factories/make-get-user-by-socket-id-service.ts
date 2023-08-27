import { GetUserBySocketId } from "../services/get-user-by-socket-id.service";

export function makeGetUserBySocketIdService() {
  const getUserBySocketId = new GetUserBySocketId();

  return getUserBySocketId;
}