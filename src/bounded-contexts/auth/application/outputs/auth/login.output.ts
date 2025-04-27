import { BaseOutput } from '../i-output-base.dto';

export class LoginOutput extends BaseOutput {
  /**
   * アクセストークン
   */
  readonly accessToken: string | null;

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
    isErrorNotFound?: boolean;
    isErrorAuth?: boolean;
    accessToken?: string | null;
  }) {
    super(args.isSuccess);
    this.isErrorNotFound = args.isErrorNotFound ?? false;
    this.isErrorAuth = args.isErrorAuth ?? false;
    this.accessToken = args.accessToken ?? null;
  }
}
