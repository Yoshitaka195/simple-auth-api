import { BaseOutput } from "../i-output-base.dto";

export class SignupOutput extends BaseOutput {
  /**
   * ユーザー名
   */
  name: string;

  /**
   * メールアドレス
   */
  email: string;

  constructor(args: {
    isSuccess: boolean;
    name: string;
    email: string;
  }) {
    super(args.isSuccess);
    this.name = args.name;
    this.email = args.email;
  }
}
