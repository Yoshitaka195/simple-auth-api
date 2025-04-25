import { UserModel } from '../../../domain/models/user.model';

export class GetOutputDto implements IOutputBaseDto {
  /**
   * ユーザー
   */
  user: UserModel | null;

  /**
   * リクエストの成功失敗
   */
  isSuccess: boolean;

  constructor(args: {
    isSuccess?: boolean;
    user?: UserModel | null;
  }) {
    this.isSuccess = args?.isSuccess ?? false;
    this.user = args?.user ?? null;
  }
}
