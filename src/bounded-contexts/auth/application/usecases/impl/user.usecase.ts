import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../../../domain/repositories/interface/i-user.repository';
import {} from '../../../infrastructure/libraries/core/i-jwt.library';
import {} from '../../../infrastructure/libraries/core/i-password-encryption.library';
import {} from '../../commands/auth';
import { UserDeleteCommand, UserFindCommand, UserUpdateCommand } from '../../commands/user';
import { UserDeleteOutput, UserFindOutput, UserUpdateOutput } from '../../outputs/user';
import { IUserUsecase } from '../core/i-user.usecase';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async find(command: UserFindCommand): Promise<UserFindOutput> {
    const { id } = command;

    const user = await this.userRepository.findById(id);
    if (!user) {
      return new UserFindOutput({
        isSuccess: false,
        isErrorNotFound: true,
      });
    }

    return new UserFindOutput({
      isSuccess: true,
      user,
    });
  }

  async update(command: UserUpdateCommand): Promise<UserUpdateOutput> {
    const { id, name } = command;

    // ユーザーの取得
    const user = await this.userRepository.findById(id);
    if (!user) {
      return new UserUpdateOutput({
        isSuccess: false,
        isErrorNotFound: true,
      });
    }

    // ユーザー名の更新
    const updatedUser = user.update({name});
  
    // ユーザー情報を保存
    const savedUser = await this.userRepository.update(updatedUser);

    return new UserUpdateOutput({
      isSuccess: true,
      user: savedUser,
    });
}

  async delete(command: UserDeleteCommand): Promise<UserDeleteOutput> {
    const { id } = command;

    // ユーザーの取得
    const user = await this.userRepository.findById(id);
    if (!user) {
      return new UserDeleteOutput({
        isSuccess: false,
        isErrorNotFound: true,
      });
    }

    // ユーザーのメールアドレスを削除扱いとする
    const markedDeleteUser = user.markEmailAsDeleted();

    // ユーザーの削除
    await this.userRepository.delete(markedDeleteUser);

    return new UserDeleteOutput({
      isSuccess: true,
    });
  }
}
