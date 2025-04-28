import {
  AuthFindCommand,
  AuthSignupCommand,
  AuthValidateCommand,
} from '../../commands/auth';
import {
  AuthFindOutput,
  AuthSignupOutput,
  AuthValidateOutput,
} from '../../outputs/auth';

export const AUTH_USECASE_TOKEN = 'AUTH_USECASE_TOKEN';
export interface IAuthUsecase {
  signup(input: AuthSignupCommand): Promise<AuthSignupOutput>;
  validate(input: AuthValidateCommand): Promise<AuthValidateOutput>;
  find(input: AuthFindCommand): Promise<AuthFindOutput>;
}
