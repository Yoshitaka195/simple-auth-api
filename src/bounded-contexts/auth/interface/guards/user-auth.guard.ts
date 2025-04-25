import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ValidateUserOutputDto } from '../../application/dtos/user';
import { ValidateUserGqlPresenter } from '../presenters/user';
import { UserModel } from '../../domain/models/user.model';

export type UserAuthGuardRequest = {
  req: { validatedUser: UserModel };
};

@Injectable()
export class UserAuthGuard extends AuthGuard('group') {
  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    return ctx.getRequest<UserAuthGuardRequest>();
  }

  handleRequest<OutputDto = ValidateUserOutputDto>(
    _err: any,
    output: ValidateUserOutputDto,
    _info: any,
    context: ExecutionContext,
  ): OutputDto {
    const validatedUser = new ValidateUserGqlPresenter(
      output,
    ).convertToGqlObject();

    const contextRequest = this.getRequest(context);
    contextRequest.req.validatedUser = validatedUser;

    return output as OutputDto;
  }
}
