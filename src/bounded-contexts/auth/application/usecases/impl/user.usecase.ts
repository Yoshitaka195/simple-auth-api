import { Inject, Injectable } from '@nestjs/common';

import { GetUserOutputDto, SignInUserInputDto, SignInUserOutputDto } from '../../dtos/user';
import { IUserRepository, USER_REPOSITORY_TOKEN } from '../../../domain/repositories/interface/i-user.repository';
import { IUserUsecase } from '../core/i-user.usecase';
@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

    async getUser(id: number): Promise<GetUserOutputDto> {
      const user = await this.userRepository.getUserById(id);
      return new GetUserOutputDto({
        isSuccess: !!user,
        user,
      });
    }
  
    async signInUser(
      usecaseInput: SignInUserInputDto,
    ): Promise<SignInUserOutputDto>    {
      const user = await this.userRepository.findUserByEmail(usecaseInput.email);
      if (!user) {
        return new SignInUserOutputDto({
          isSuccess: false,
          user: null,
        });
      }
    }
}
