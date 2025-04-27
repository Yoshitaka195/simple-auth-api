import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import {} from '../../bounded-contexts/auth/application/outputs/auth';
import { UserModel } from '../../bounded-contexts/auth/domain/models/user.model';

export interface AuthenticatedRequest extends Request {
  user: UserModel;
}

export type CurrentUserDto = {
  id: number;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserDto => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request.user || !request.user?.id) {
      throw new UnauthorizedException();
    }

    return { id: request.user.id };
  },
);
