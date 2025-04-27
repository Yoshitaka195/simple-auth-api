import { BaseOutput } from '../i-output-base.dto';

export class SignupOutput extends BaseOutput {
  /**
   * ユーザー名
   */
  readonly name: string | null;

  /**
   * メールアドレス
   */
  readonly email: string | null;

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
    name?: string;
    email?: string;
    accessToken?: string;
    isErrorAlreadyExists?: boolean;
  }) {
    super(args.isSuccess);
    this.name = args.name ?? null;
    this.email = args.email ?? null;
    this.accessToken = args.accessToken ?? null;
    this.isErrorAlreadyExists = args.isErrorAlreadyExists ?? false;
  }
}
