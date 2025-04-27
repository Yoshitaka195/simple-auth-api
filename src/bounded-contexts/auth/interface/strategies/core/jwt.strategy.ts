import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthFindByEmailCommand } from '../../../application/commands/auth';
import {
  AUTH_USECASE_TOKEN,
  IAuthUsecase,
} from '../../../application/usecases/core/i-auth.usecase';
import { AuthFindByEmailInputDto } from '../../dtos/auth';

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
      ignoreExpiration: false,
    });
  }

  async validate(input: AuthFindByEmailInputDto): Promise<any> {
    if (!input?.email) {
      throw new BadRequestException();
    }

    const command = new AuthFindByEmailCommand(input);
    const output = await this.authUsecase.findByEmail(command);

    if (!output.isSuccess) {
      throw new UnauthorizedException();
    }

    if (!output.user) {
      throw new UnauthorizedException();
    }

    return output.user.id;
  }
}
