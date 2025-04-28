import { InternalServerErrorException } from '@nestjs/common';
import { UserDeleteOutput } from '../../../application/outputs/user';

export class DeleteResponsePresenter {
  readonly output: UserDeleteOutput;

  constructor(private readonly outputDto: UserDeleteOutput) {
    this.outputDto = outputDto;
  }

  convertToResponse() {
    if (this.outputDto.isErrorNotFound) {
      return { message: 'No user found' };
    }

    if (!this.outputDto.isSuccess) {
      throw new InternalServerErrorException(
        'ユーザー情報の削除に失敗しました',
      );
    }

    return { message: 'Account and user successfully removed' };
  }
}
