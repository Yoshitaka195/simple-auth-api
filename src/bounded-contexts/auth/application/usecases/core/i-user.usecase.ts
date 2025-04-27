import {} from '../../commands/auth';
import { UserDeleteCommand, UserFindCommand, UserUpdateCommand } from '../../commands/user';
import { UserDeleteOutput, UserFindOutput, UserUpdateOutput } from '../../outputs/user';

export const USER_USECASE_TOKEN = 'USER_USECASE_TOKEN';
export interface IUserUsecase {
  find(id: UserFindCommand): Promise<UserFindOutput>;
  update(command: UserUpdateCommand): Promise<UserUpdateOutput>;
  delete(command: UserDeleteCommand): Promise<UserDeleteOutput>;
}
