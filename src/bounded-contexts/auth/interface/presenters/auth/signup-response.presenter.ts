import { UnauthorizedException } from '@nestjs/common';
import { AuthSignupOutput } from '../../../application/outputs/auth';

export class SignupResponsePresenter {
  readonly output: AuthSignupOutput;

  constructor(private readonly outputDto: AuthSignupOutput) {
    this.outputDto = outputDto;
  }

  convertToResponse() {
    if (this.outputDto.isErrorAlreadyExists) {
      return {
        message: 'Account creation failed',
        cause: 'Already same user_id is used',
      };
    }

    if (!this.outputDto.isSuccess) {
      throw new UnauthorizedException('新規登録に失敗しました');
    }

    if (!this.outputDto.user) {
      throw new UnauthorizedException('新規登録に失敗しました');
    }

    return {
      message: 'Account successfully created',
      user: {
        user_id: this.outputDto.user.id,
        nickname: this.outputDto.user.nickname,
      },
    };
  }
}
