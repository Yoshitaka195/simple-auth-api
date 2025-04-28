export class UpdateCommand {
  /**
   * ユーザーID
   */
  readonly id: string;

  /**
   * ニックネーム
   */
  readonly nickname: string | undefined;

  /**
   * コメント
   */
  readonly comment: string | undefined;

  constructor(args: {
    id: string;
    nickname?: string | undefined;
    comment?: string | undefined;
  }) {
    this.id = args.id;
    this.nickname = args.nickname;
    this.comment = args.comment;
  }
}
