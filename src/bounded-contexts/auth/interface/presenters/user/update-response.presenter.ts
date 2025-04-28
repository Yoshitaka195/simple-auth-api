import { InternalServerErrorException } from '@nestjs/common';
import { UserUpdateOutput } from '../../../application/outputs/user';

export class UpdateResponsePresenter {
  readonly output: UserUpdateOutput;

  constructor(private readonly outputDto: UserUpdateOutput) {
    this.outputDto = outputDto;
  }

  convertToResponse() {
    if (this.outputDto.isErrorNotFound) {
      return { message: 'No user found' };
    }

    if (!this.outputDto.isSuccess) {
      throw new InternalServerErrorException(
        'Failed to update user information',
      );
    }

    if (!this.outputDto.user) {
      throw new InternalServerErrorException(
        'Failed to update user information',
      );
    }

    return {
      message: 'User successfully updated',
      user: [
        {
          nickname: this.outputDto.user.nickname,
          comment: this.outputDto.user.comment,
        },
      ],
    };
  }
}
