export class UpdateCommand {
  /**
   * ユーザーID
   */
  readonly id: number;

  /**
   * 名前
   */
  readonly name: string;

  constructor(args: {
    id: number;
    name: string;
  }) {
    this.id = args.id;
    this.name = args.name;
  }
}
