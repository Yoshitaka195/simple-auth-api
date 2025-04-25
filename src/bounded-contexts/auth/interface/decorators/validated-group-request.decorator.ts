import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { UserAuthGuardRequest } from '../guards/user-auth.guard';

export const ValidatedUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<UserAuthGuardRequest>();

    return request.req.validatedUser
  },
);
