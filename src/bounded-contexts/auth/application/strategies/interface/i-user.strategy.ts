import { ValidateUserOutputDto } from '../../dtos/user';

export const USER_STATEGY_TOKEN = 'USER_STATEGY_TOKEN';
export interface IUserStrategy {
  validate(request: any): Promise<ValidateUserOutputDto>;
}
