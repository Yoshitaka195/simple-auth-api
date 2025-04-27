export class FindCommand {
  /**
   * ユーザーID
   */
  readonly id: number;

  constructor(args: {
    id: number;
  }) {
    this.id = args.id;
  }
}
