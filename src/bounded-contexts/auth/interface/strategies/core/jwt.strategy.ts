import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthFindCommand } from '../../../application/commands/auth';
import {
  AUTH_USECASE_TOKEN,
  IAuthUsecase,
} from '../../../application/usecases/core/i-auth.usecase';
import { UserModel } from '../../../domain/models/user.model';
import { AuthFindInputDto } from '../../dtos/auth';
import { AuthValidateJwtStrategyPresenter } from '../../presenters/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_USECASE_TOKEN)
    private readonly authUsecase: IAuthUsecase,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('auth.jwt_secret') || '',
      ignoreExpiration: false,
    });
  }

  async validate(input: AuthFindInputDto): Promise<UserModel> {
    if (!input.id || !input.email) {
      throw new UnauthorizedException('認証に失敗しました');
    }

    const command = new AuthFindCommand(input);
    const output = await this.authUsecase.find(command);

    return new AuthValidateJwtStrategyPresenter(output).convertToUser();
  }
}
