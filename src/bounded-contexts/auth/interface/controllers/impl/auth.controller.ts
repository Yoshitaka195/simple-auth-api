import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthSignupCommand } from '../../../application/commands/auth';
import {
  AUTH_USECASE_TOKEN,
  IAuthUsecase,
} from '../../../application/usecases/core/i-auth.usecase';
import { AuthSignupInputDto } from '../../dtos/auth';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_USECASE_TOKEN)
    private readonly authUsecase: IAuthUsecase,
  ) {}

  @Post('signup')
  async signup(@Body() input: AuthSignupInputDto) {
    console.log('input', input);
    const command = new AuthSignupCommand(input);
    const output = await this.authUsecase.signup(command);
    return output;
  }

  // @Post('login')
  // async login() {
  //   throw new Error('Not implemented');
  // }

  // @UseGuards(AuthGuard)
  // @Post('logout')
  // async logout(@Request() req) {
  //   throw new Error('Not implemented');
  // }

  // @UseGuards(AuthGuard)
  // @Post('refresh')
  // async refresh(@Request() req) {
  //   throw new Error('Not implemented');
  // }
}
