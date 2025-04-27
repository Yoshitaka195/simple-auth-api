import { InternalServerErrorException, NotFoundException, } from "@nestjs/common";
import { UserFindOutput } from "../../../application/outputs/user";


export class FindResponsePresenter  {

  readonly output: UserFindOutput;

  constructor(
    private readonly outputDto: UserFindOutput,
  ) {
    this.outputDto =  outputDto;
  }

  convertToResponse(): UserFindOutput {
    if (this.outputDto.isErrorNotFound) {
      throw new NotFoundException('対象のユーザーが見つかりません');
    }

    if (!this.outputDto.isSuccess) {
      throw new InternalServerErrorException('ユーザー情報の取得に失敗しました');
    }

    return this.outputDto;
  }

}
