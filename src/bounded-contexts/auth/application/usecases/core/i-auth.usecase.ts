import {
  AuthFindByEmailCommand,
  AuthLoginCommand,
  AuthSignupCommand,
  AuthValidateCommand,
} from '../../commands/auth';
import {
  AuthFindByEmailOutput,
  AuthLoginOutput,
  AuthSignupOutput,
  AuthValidateOutput,
} from '../../outputs/auth';

export const AUTH_USECASE_TOKEN = 'AUTH_USECASE_TOKEN';
export interface IAuthUsecase {
  signup(input: AuthSignupCommand): Promise<AuthSignupOutput>;
  validate(input: AuthValidateCommand): Promise<AuthValidateOutput>;
  login(input: AuthLoginCommand): Promise<AuthLoginOutput>;
  findByEmail(input: AuthFindByEmailCommand): Promise<AuthFindByEmailOutput>;
}
