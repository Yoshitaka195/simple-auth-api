import { UserModel } from '../../../domain/models/user.model';
import { IUserRepository } from '../../../domain/repositories/interface/i-user.repository';

export class UserRepository implements IUserRepository {
  // constructor(
  //   @Inject('USER_REPOSITORY_TOKEN')
  //   private readonly userRepository: IUserRepository,
  // ) {}

  getUserById(id: number): Promise<UserModel | null> {
    throw new Error('Method not implemented.');
  }
  createUser(user: UserModel): Promise<UserModel | null> {
    throw new Error('Method not implemented.');
  }
  updateUser(user: UserModel): Promise<UserModel | null> {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findUserByEmail(email: string): Promise<UserModel | null> {
    throw new Error('Method not implemented.');
  }
  findUserByUsername(username: string): Promise<UserModel | null> {
    throw new Error('Method not implemented.');
  }
}
