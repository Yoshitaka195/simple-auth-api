export class FindCommand {
  /**
   * ID
   */
  readonly id: number;

  constructor(args: {
    id: number;
  }) {
    this.id = args.id;
  }
}
