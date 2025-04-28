export class LoginCommand {
  /**
   * メールアドレス
   */
  readonly id: string;

  constructor(args: {
    id: string;
  }) {
    this.id = args.id;
  }
}
