import { UserModel } from '../../../domain/models/user.model';
import { BaseOutput } from '../i-output-base.dto';

export class SignupOutput extends BaseOutput {
  /**
   * ユーザー
   */
  readonly user: UserModel | null;

  /**
   * アクセストークン
   */
  readonly accessToken: string | null;

  /**
   * 既に登録済みの場合
   */
  readonly isErrorAlreadyExists: boolean;

  constructor(args: {
    isSuccess: boolean;
    user?: UserModel;
    accessToken?: string;
    isErrorAlreadyExists?: boolean;
  }) {
    super(args.isSuccess);
    this.user = args.user ?? null;
    this.accessToken = args.accessToken ?? null;
    this.isErrorAlreadyExists = args.isErrorAlreadyExists ?? false;
  }
}
