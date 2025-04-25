import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  USER_REPOSITORY_TOKEN,
  IUserRepository,
} from '../../../domain/repositories/interface/i-user.repository';
import { ValidateUserOutputDto } from '../../dtos/user';
import { IUserStrategy } from '../interface/i-user.strategy';

@Injectable()
export class UserStrategy
  extends PassportStrategy(Strategy, 'user')
  implements IUserStrategy
{
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    protected readonly configService: ConfigService,
  ) {
    console.log(configService.get<string>('auth.nextauth_secret'));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('auth.nextauth_secret'),
      algorithms: ['HS512'],
      // expiresIn: '1w',
      // expは無視したい
      ignoreExpiration: true,
    });
  }

  async validate(request: any): Promise<ValidateUserOutputDto> {
    const user =
      await this.userRepository.getUserById(
        request.sub,
      );

    if (!user) {
      return new ValidateUserOutputDto({
        isSuccess: false,
        user: null,
      });
    }

    return new ValidateUserOutputDto({
      isSuccess: true,
      user,
    });
  }
}
