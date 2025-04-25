import { UserModel } from "../../models/user.model";

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';
export interface IUserRepository {
  getUserById(id: number): Promise<UserModel | null>;
  createUser(user: UserModel): Promise<UserModel | null>;
  updateUser(user: UserModel): Promise<UserModel | null>;
  deleteUser(id: number): Promise<boolean>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  findUserByUsername(username: string): Promise<UserModel | null>;
}
