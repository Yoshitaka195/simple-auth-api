import { UserModel } from '../../../domain/models/user.model';
import { BaseOutput } from '../i-output-base.dto';

export class SignupOutput extends BaseOutput {
  /**
   * ユーザー
   */
  readonly user: UserModel | null;

  /**
   * 既に登録済みの場合
   */
  readonly isErrorAlreadyExists: boolean;

  constructor(args: {
    isSuccess: boolean;
    user?: UserModel;
    isErrorAlreadyExists?: boolean;
  }) {
    super(args.isSuccess);
    this.user = args.user ?? null;
    this.isErrorAlreadyExists = args.isErrorAlreadyExists ?? false;
  }
}
