import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../domain/models/user.model';
import { IUserRepository } from '../../../domain/repositories/interface/i-user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  // constructor(
  //   @Inject('USER_REPOSITORY_TOKEN')
  //   private readonly userRepository: IUserRepository,
  // ) {}

  async findById(id: number): Promise<UserModel | null> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    throw new Error('Method not implemented.');
  }

  async create(user: UserModel): Promise<UserModel> {
    return user;
  }

  async update(user: UserModel): Promise<UserModel> {
    return user;
  }

  async delete(user: UserModel): Promise<void> {
    return;
  }
}
