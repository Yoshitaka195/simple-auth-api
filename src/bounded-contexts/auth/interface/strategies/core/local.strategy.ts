import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthValidateCommand } from '../../../application/commands/auth';
import {
  AUTH_USECASE_TOKEN,
  IAuthUsecase,
} from '../../../application/usecases/core/i-auth.usecase';
import { ValidateInputDto } from '../../dtos/auth/validate-input.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_USECASE_TOKEN)
    private readonly authUsecase: IAuthUsecase,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(input: ValidateInputDto): Promise<any> {
    if (!input?.email) {
      throw new BadRequestException();
    }

    const command = new AuthValidateCommand(input);
    const output = await this.authUsecase.validate(command);

    if (!output.isSuccess) {
      throw new UnauthorizedException();
    }

    if (!output.user) {
      throw new UnauthorizedException();
    }

    return output.user;
  }
}
