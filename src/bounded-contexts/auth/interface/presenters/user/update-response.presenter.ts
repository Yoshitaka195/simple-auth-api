import { InternalServerErrorException, NotFoundException, } from "@nestjs/common";
import { UserUpdateOutput } from "../../../application/outputs/user";


export class UpdateResponsePresenter  {

  readonly output: UserUpdateOutput;

  constructor(
    private readonly outputDto: UserUpdateOutput,
  ) {
    this.outputDto =  outputDto;
  }

  convertToResponse(): UserUpdateOutput {
    if (this.outputDto.isErrorNotFound) {
      throw new NotFoundException('対象のユーザーが見つかりません');
    }

    if (!this.outputDto.isSuccess) {
      throw new InternalServerErrorException('ユーザー情報の更新に失敗しました');
    }

    return this.outputDto;
  }

}
