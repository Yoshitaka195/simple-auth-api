export class LoginCommand {
  /**
   * メールアドレス
   */
  readonly id: number;

  constructor(args: {
    id: number;
  }) {
    this.id = args.id;
  }
}
