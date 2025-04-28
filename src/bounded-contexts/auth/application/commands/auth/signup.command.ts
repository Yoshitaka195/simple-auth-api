export class SignupCommand {
  /**
   * ユーザーID
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
