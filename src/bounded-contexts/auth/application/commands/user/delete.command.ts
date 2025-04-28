export class DeleteCommand {
  /**
   * ユーザーID
   */
  readonly id: string;

  constructor(args: {
    id: string;
  }) {
    this.id = args.id;
  }
}
