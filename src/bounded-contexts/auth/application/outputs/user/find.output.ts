import { UserModel } from '../../../domain/models/user.model';
import { BaseOutput } from '../i-output-base.dto';

export class FindOutput extends BaseOutput {
  /**
   * ユーザー情報
   */
  readonly user: UserModel | null;

  /**
   * アカウントが存在しない場合
   */
  readonly isErrorNotFound: boolean;

  constructor(args: {
    isSuccess: boolean;
    user?: UserModel;
    isErrorNotFound?: boolean;
  }) {
    super(args.isSuccess);
    this.user = args.user ?? null;
    this.isErrorNotFound = args.isErrorNotFound ?? false;
  }
}
