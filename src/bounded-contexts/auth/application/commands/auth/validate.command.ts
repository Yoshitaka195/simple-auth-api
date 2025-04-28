export class ValidateCommand {
  /**
   * ユーザID
   */
  readonly userId: string;

  /**
   * パスワード
   */
  readonly password: string;

  constructor(args: {
    userId: string;
    password: string;
  }) {
    this.userId = args.userId;
    this.password = args.password;
  }
}
