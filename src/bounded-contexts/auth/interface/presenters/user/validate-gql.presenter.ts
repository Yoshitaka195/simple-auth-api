import { ValidateUserOutputDto } from '../../../application/dtos/user';
import { UserModel } from '../../../domain/models/user.model';

export class ValidateGqlPresenter {
  validateOutputDto: ValidateUserOutputDto;

  constructor(validateOutputDto: ValidateUserOutputDto) {
    this.validateOutputDto = validateOutputDto;
  }

  convertToGqlObject(): UserModel | null {
    if (!this.validateOutputDto.isSuccess) {
      throw new Error()
    }

    return this.validateOutputDto.user
  }
}
