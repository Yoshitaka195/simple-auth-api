import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  AUTH_USECASE_TOKEN,
  IAuthUsecase,
} from '../../usecases/core/i-auth.usecase';
import {} from '../../usecases/core/i-auth.usecase';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_USECASE_TOKEN)
    private readonly authUsecase: IAuthUsecase,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('auth.nextauth_secret') || '',
      algorithms: ['HS512'],
    });
  }

  async validate(request: any): Promise<any> {
    throw new Error('Not implemented');
  }
}
