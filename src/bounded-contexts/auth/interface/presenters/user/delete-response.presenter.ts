import { InternalServerErrorException, NotFoundException, } from "@nestjs/common";
import { UserDeleteOutput } from "../../../application/outputs/user";


export class DeleteResponsePresenter  {

  readonly output: UserDeleteOutput;

  constructor(
    private readonly outputDto: UserDeleteOutput,
  ) {
    this.outputDto =  outputDto;
  }

  convertToResponse(): UserDeleteOutput {
    if (this.outputDto.isErrorNotFound) {
      throw new NotFoundException('対象のユーザーが見つかりません');
    }

    if (!this.outputDto.isSuccess) {
      throw new InternalServerErrorException('ユーザー情報の削除に失敗しました');
    }

    return this.outputDto;
  }

}
