import { UnauthorizedException } from "@nestjs/common";
import { AuthLoginOutput } from "../../../application/outputs/auth";


export class LoginResponsePresenter  {

  readonly output: AuthLoginOutput;

  constructor(
    private readonly outputDto: AuthLoginOutput,
  ) {
    this.outputDto =  outputDto;
  }

  convertToResponse(): AuthLoginOutput {
    if (!this.outputDto.isSuccess) {
      throw new UnauthorizedException('認証に失敗しました');
    }

    return this.outputDto;
  }

}
