export class FindByEmailCommand {
  /**
   * メールアドレス
   */
  readonly email: string;

  constructor(args: {
    email: string;
  }) {
    this.email = args.email;
  }
}
