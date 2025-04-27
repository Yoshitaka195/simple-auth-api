import { UserModel } from '../../../domain/models/user.model';
import { BaseOutput } from '../i-output-base.dto';

export class ValidateOutput extends BaseOutput {
  /**
   * ユーザー情報
   */
  readonly user: UserModel | null;

  /**
   * アカウントが存在しない場合
   */
  readonly isErrorNotFound: boolean;

  /**
   * 認証エラーの場合
   */
  readonly isErrorAuth: boolean;

  constructor(args: {
    isSuccess: boolean;
    user?: UserModel;
    isErrorNotFound?: boolean;
    isErrorAuth?: boolean;
  }) {
    super(args.isSuccess);
    this.user = args.user ?? null;
    this.isErrorNotFound = args.isErrorNotFound ?? false;
    this.isErrorAuth = args.isErrorAuth ?? false;
  }
}
