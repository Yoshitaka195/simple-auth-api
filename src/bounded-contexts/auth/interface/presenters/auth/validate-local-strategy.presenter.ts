import { UnauthorizedException, } from "@nestjs/common";
import { AuthValidateOutput,  } from "../../../application/outputs/auth";
import { UserModel } from "../../../domain/models/user.model";

export class ValidateLocalStrategyPresenter  {

  readonly output: AuthValidateOutput

  constructor(
    private readonly outputDto: AuthValidateOutput,
  ) {
    this.outputDto =  outputDto;
  }

  convertToUser(): UserModel {
    if (!this.outputDto.isSuccess) {
      throw new UnauthorizedException('認証に失敗しました');
    }

    if (!this.outputDto.user) {
      throw new UnauthorizedException('認証に失敗しました');
    }

    return this.outputDto.user
  }
}
