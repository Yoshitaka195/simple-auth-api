import {
  GetUserOutputDto,
  SignInUserInputDto,
  SignInUserOutputDto,
} from '../../dtos/user';

export const GROUP_ACCOUNT_USECASE_TOKEN = 'GROUP_ACCOUNT_USECASE_TOKEN';
export interface IUserUsecase {
  getUser(id: number): Promise<GetUserOutputDto>;

  signInUser(
    usecaseInput: SignInUserInputDto,
  ): Promise<SignInUserOutputDto>;
}
