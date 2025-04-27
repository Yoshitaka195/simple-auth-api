import { UnauthorizedException, } from "@nestjs/common";
import { AuthFindOutput } from "../../../application/outputs/auth";
import { UserModel } from "../../../domain/models/user.model";

export class ValidateJwtStragetyPresenter  {

  readonly output: AuthFindOutput;

  constructor(
    private readonly outputDto: AuthFindOutput
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
