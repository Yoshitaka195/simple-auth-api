export class LoginCommand {
  /**
   * メールアドレス
   */
  id: number;

  constructor(args: {
    id: number;
  }) {
    this.id = args.id;
  }
}
