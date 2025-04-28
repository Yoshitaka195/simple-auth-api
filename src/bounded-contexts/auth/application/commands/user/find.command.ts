export class FindCommand {
  /**
   * ID
   */
  readonly id: string;

  constructor(args: {
    id: string;
  }) {
    this.id = args.id;
  }
}
