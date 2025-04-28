import { Inject, Injectable, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy, } from '@nestjs/passport';
import { BasicStrategy  as Strategy  } from 'passport-http';
import { AuthValidateCommand } from '../../../application/commands/auth';
import {
  AUTH_USECASE_TOKEN,
  IAuthUsecase,
} from '../../../application/usecases/core/i-auth.usecase';
import { UserModel } from '../../../domain/models/user.model';
import { AuthValidateBasicStrategyPresenter } from '../../presenters/auth';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_USECASE_TOKEN)
    private readonly authUsecase: IAuthUsecase,
    protected readonly configService: ConfigService,
  ) {
    super();
  }

  async validate(userId: string, password: string): Promise<UserModel | null> {
    if (!userId || !password) {
      return null
    }

    const command = new AuthValidateCommand({
      userId,
      password,
    });

    const output = await this.authUsecase.validate(command);

    return new AuthValidateBasicStrategyPresenter(output).convertToUser();
  }
}
