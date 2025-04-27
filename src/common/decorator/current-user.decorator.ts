import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { AuthValidateOutput } from '../../bounded-contexts/auth/application/outputs/auth';

export interface AuthenticatedRequest extends Request {
  output: AuthValidateOutput;
}

export type CurrentUserDto = {
  id: number;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserDto => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request.output.user || !request.output.user?.id) {
      throw new UnauthorizedException();
    }

    return { id: request.output.user.id };
  },
);
