export class ValidateCommand {
  /**
   * メールアドレス
   */
  readonly email: string;

  /**
   * パスワード
   */
  readonly password: string;

  constructor(args: {
    email: string;
    password: string;
  }) {
    this.email = args.email;
    this.password = args.password;
  }
}
