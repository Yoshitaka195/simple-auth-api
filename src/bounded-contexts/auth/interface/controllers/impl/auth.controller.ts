import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CurrentUser,
  CurrentUserDto,
} from '../../../../../common/decorator/current-user.decorator';
import {
  AuthLoginCommand,
  AuthSignupCommand,
} from '../../../application/commands/auth';
import {
  AUTH_USECASE_TOKEN,
  IAuthUsecase,
} from '../../../application/usecases/core/i-auth.usecase';
import { AuthSignupInputDto } from '../../dtos/auth';
import {
  AuthLoginResponsePresenter,
  AuthSignupResponsePresenter,
} from '../../presenters/auth';

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

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@CurrentUser() user: CurrentUserDto) {
    const command = new AuthLoginCommand({ id: user.id });
    const output = await this.authUsecase.login(command);

    return new AuthLoginResponsePresenter(output).convertToResponse();
  }
}
