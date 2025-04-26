import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserModel } from '../../bounded-contexts/auth/domain/models/user.model';

export type AuthRequestDto = {
  user: UserModel;
  headers: {
    authorization: string;
  };
};

export const AuthRequest = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthRequestDto => {
    return {
      user: {} as UserModel,
      headers: {
        authorization: context.switchToHttp().getRequest().headers
          .authorization,
      },
    };
  },
);
