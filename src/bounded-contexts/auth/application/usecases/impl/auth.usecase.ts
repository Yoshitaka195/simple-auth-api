import { Inject, Injectable } from '@nestjs/common';

import { UserModel } from '../../../domain/models/user.model';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../../../domain/repositories/interface/i-user.repository';
import {
  IJwtLibrary,
  JWT_LIBRARY_TOKEN,
} from '../../../infrastructure/libraries/core/i-jwt.library';
import {
  IPasswordEncryptionLibrary,
  PASSWORD_ENCRYPTION_LIBRARY_TOKEN,
} from '../../../infrastructure/libraries/core/i-password-encryption.library';
import {
  AuthFindCommand,
  AuthLoginCommand,
  AuthValidateCommand,
} from '../../commands/auth';
import { SignupCommand } from '../../commands/auth/signup.command';
import {
  AuthFindOutput,
  AuthLoginOutput,
  AuthSignupOutput,
  AuthValidateOutput,
} from '../../outputs/auth';
import { IAuthUsecase } from '../core/i-auth.usecase';

@Injectable()
export class AuthUsecase implements IAuthUsecase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_ENCRYPTION_LIBRARY_TOKEN)
    private readonly passwordEncryptionLibrary: IPasswordEncryptionLibrary,
    @Inject(JWT_LIBRARY_TOKEN)
    private readonly jwtLibrary: IJwtLibrary,
  ) {}

  async signup(command: SignupCommand): Promise<AuthSignupOutput> {
    const { name, email, password } = command;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return new AuthSignupOutput({
        isSuccess: false,
        isErrorAlreadyExists: true,
      });
    }

    const hashedPassword =
      await this.passwordEncryptionLibrary.encryptPassword(password);

    const user = UserModel.buildNew({
      name,
      email,
      hashedPassword,
    });

    // ユーザー情報をDBに保存
    const createdUser = await this.userRepository.create(user);

    // アクセストークン発行
    const accessToken = await this.jwtLibrary.generateToken(createdUser);

    return new AuthSignupOutput({
      isSuccess: true,
      name: createdUser.name,
      email: createdUser.email,
      accessToken,
    });
  }

  async validate(command: AuthValidateCommand): Promise<AuthValidateOutput> {
    const { email, password } = command;

    // メールアドレス情報を元にユーザー情報を取得
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return new AuthValidateOutput({
        isSuccess: false,
        isErrorNotFound: true,
      });
    }

    // パスワードを比較・認証
    const isPasswordValid =
      await this.passwordEncryptionLibrary.comparePassword(
        password,
        user.hashedPassword,
      );
    if (!isPasswordValid) {
      return new AuthValidateOutput({
        isSuccess: false,
        isErrorAuth: true,
      });
    }

    return new AuthValidateOutput({
      isSuccess: true,
      user,
    });
  }

  async login(input: AuthLoginCommand): Promise<AuthLoginOutput> {
    const { id } = input;

    const user = await this.userRepository.findById(id);
    if (!user) {
      return new AuthLoginOutput({
        isSuccess: false,
        isErrorNotFound: true,
      });
    }

    const accessToken = await this.jwtLibrary.generateToken(user);

    return new AuthLoginOutput({
      isSuccess: true,
      accessToken,
    });
  }

  async find(input: AuthFindCommand): Promise<AuthFindOutput> {
    const { id } = input;

    const user = await this.userRepository.findById(id);
    if (!user) {
      return new AuthFindOutput({
        isSuccess: false,
        isErrorNotFound: true,
      });
    }

    return new AuthFindOutput({
      isSuccess: true,
      user,
    });
  }
}
