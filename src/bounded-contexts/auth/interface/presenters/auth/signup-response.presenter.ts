import { UnauthorizedException } from "@nestjs/common";
import { AuthSignupOutput } from "../../../application/outputs/auth";


export class SignupResponsePresenter  {

  readonly output: AuthSignupOutput;

  constructor(
    private readonly outputDto: AuthSignupOutput,
  ) {
    this.outputDto =  outputDto;
  }

  convertToResponse(): AuthSignupOutput {
    if (this.outputDto.isErrorAlreadyExists) {
      throw new UnauthorizedException('このメールアドレスは既に登録されています');
    }

    if (!this.outputDto.isSuccess) {
      throw new UnauthorizedException('新規登録に失敗しました');
    }

    return this.outputDto;
  }

}
