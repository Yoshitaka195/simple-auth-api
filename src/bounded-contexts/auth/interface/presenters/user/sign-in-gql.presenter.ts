import { SignInUserOutputDto } from '../../../application/dtos/user';

export class SignInGqlPresenter {
  clientMutationId: string | null;

  signInOutputDto: SignInUserOutputDto;

  constructor(
    clientMutationId: string | null,
    signInOutputDto: SignInUserOutputDto,
  ) {
    clientMutationId = clientMutationId;
    this.signInOutputDto = signInOutputDto;
  }

  convertToGqlObject(): any {
    if (!this.signInOutputDto.isSuccess) {
      throw new Error()
    }
    if (!this.signInOutputDto.user) {
      return null;
    }

    return this.signInOutputDto.user;
  }

}
