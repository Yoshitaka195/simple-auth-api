export class LoginCommand {
  /**
   * メールアドレス
   */
  id: string;

  constructor(args: {
    id: string;
  }) {
    this.id = args.id;
  }
}
