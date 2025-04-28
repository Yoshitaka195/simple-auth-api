import { Body, Controller, Inject, Post } from '@nestjs/common';
import {} from '../../../../../common/decorator/current-user.decorator';
import { AuthSignupCommand } from '../../../application/commands/auth';
import {
  AUTH_USECASE_TOKEN,
  IAuthUsecase,
} from '../../../application/usecases/core/i-auth.usecase';
import { AuthSignupInputDto } from '../../dtos/auth';
import { AuthSignupResponsePresenter } from '../../presenters/auth';

@Controller()
export class AuthController {
  constructor(
    @Inject(AUTH_USECASE_TOKEN)
    private readonly authUsecase: IAuthUsecase,
  ) {}

  @Post('signup')
  async signup(@Body() input: AuthSignupInputDto) {
    const command = new AuthSignupCommand(input);
    const output = await this.authUsecase.signup(command);

    return new AuthSignupResponsePresenter(output).convertToResponse();
  }
}
