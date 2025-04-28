import { UserModel } from '../../models/user.model';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';
export interface IUserRepository {
  findById(userId: string): Promise<UserModel | null>;
  create(user: UserModel): Promise<UserModel>;
  update(user: UserModel): Promise<UserModel>;
  delete(user: UserModel): Promise<void>;
}
