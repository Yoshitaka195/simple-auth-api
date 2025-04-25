import { GetUserOutputDto } from '../../../application/dtos/user';
import { UserModel } from '../../../domain/models/user.model';

export class GetGqlPresenter  {
  getOutputDto: GetUserOutputDto;

  constructor(getOutputDto: GetUserOutputDto) {
    this.getOutputDto = getOutputDto;
  }

  convertToGqlObject(): UserModel | null {
    if (!this.getOutputDto.isSuccess) {
      throw new Error()
    }
    if (!this.getOutputDto.user) {
      return null;
    }

    return new UserModel({ ...this.getOutputDto.user });
  }
}
