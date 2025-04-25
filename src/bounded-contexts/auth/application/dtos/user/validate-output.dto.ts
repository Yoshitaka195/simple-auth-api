import { UserModel } from '../../../domain/models/user.model';

export class ValidateOutputDto implements IOutputBaseDto {
  /**
   * リクエストの成功失敗
   */
  isSuccess: boolean;

  /**
   * ユーザー
   */
  user: UserModel | null;

  constructor(args: {
    isSuccess?: boolean;
    user?: UserModel | null;
  }) {
    this.isSuccess = args?.isSuccess ?? false;
    this.user = args?.user ?? null;
  }
}
