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

  constructor(args: {
    isSuccess: boolean;
    isErrorNotFound?: boolean;
    accessToken?: string | null;
  }) {
    super(args.isSuccess);
    this.isErrorNotFound = args.isErrorNotFound ?? false;
    this.accessToken = args.accessToken ?? null;
  }
}
