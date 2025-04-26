import { Inject, Injectable } from '@nestjs/common';

import { UserModel } from '../../../domain/models/user.model';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../../../domain/repositories/interface/i-user.repository';
import {
  IPasswordEncryptionLibrary,
  PASSWORD_ENCRYPTION_LIBRARY_TOKEN,
} from '../../../infrastructure/libraries/core/i-password-encryption.library';
import { SignupCommand } from '../../commands/auth/signup.command';
import { AuthSignupOutput } from '../../outputs/auth';
import { IAuthUsecase } from '../core/i-auth.usecase';

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_ENCRYPTION_LIBRARY_TOKEN)
    private readonly passwordEncryptionLibrary: IPasswordEncryptionLibrary,
  ) {}

  async signup(command: SignupCommand): Promise<AuthSignupOutput> {
    const { name, email, password } = command;

    const hashedPassword =
      await this.passwordEncryptionLibrary.encryptPassword(password);

    const user = UserModel.buildNew({
      name,
      email,
      hashedPassword,
    });

    const createdUser = await this.userRepository.create(user);

    return new AuthSignupOutput({
      isSuccess: true,
      name: createdUser.name,
      email: createdUser.email,
    });
  }

  async login(input: any): Promise<any> {
    throw new Error('Not implemented');
  }
}
