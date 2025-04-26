export class SignupCommand {
  /**
   * ユーザー名
   */
  name: string;

  /**
   * メールアドレス
   */
  email: string;

  /**
   * パスワード
   */
  password: string;

  constructor(args: {
    name: string;
    email: string;
    password: string;
  }) {
    this.name = args.name;
    this.email = args.email;
    this.password = args.password;
  }
}
