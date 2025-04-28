import { InternalServerErrorException } from '@nestjs/common';
import { UserFindOutput } from '../../../application/outputs/user';

export class FindResponsePresenter {
  readonly output: UserFindOutput;

  constructor(private readonly outputDto: UserFindOutput) {
    this.outputDto = outputDto;
  }

  convertToResponse() {
    if (this.outputDto.isErrorNotFound) {
      return { message: 'No user found' };
    }

    if (!this.outputDto.isSuccess) {
      throw new InternalServerErrorException(
        'Failed to retrieve user information',
      );
    }

    if (!this.outputDto.user) {
      throw new InternalServerErrorException(
        'Failed to retrieve user information',
      );
    }

    return {
      message: 'User details by user_id',
      user: {
        user_id: this.outputDto.user.id,
        nickname: this.outputDto.user.nickname,
        comment: this.outputDto.user.comment ?? undefined,
      },
    };
  }
}
