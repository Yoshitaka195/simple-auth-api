import { SignupCommand } from '../../commands/auth/signup.command';
import { AuthSignupOutput } from '../../outputs/auth';

export const AUTH_USECASE_TOKEN = 'AUTH_USECASE_TOKEN';
export interface IAuthUsecase {
  signup(input: SignupCommand): Promise<AuthSignupOutput>;
  login(input: any): Promise<any>;
}
