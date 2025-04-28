export type HashedString = string & { readonly __brand: unique symbol };

/**
 * ユーザーモデル
 */
export class UserModel {
  /**
   * ユーザーID
   */
  readonly id: string;

  /**
   * ニックネーム
   */
  readonly nickname: string;

  /**
   * コメント
   */
  readonly comment: string | null;

  /**
   * パスワード
   */
  readonly hashedPassword: HashedString;

  constructor(args: {
    id: string;
    nickname: string;
    comment: string | null;
    hashedPassword: HashedString;
  }) {
    this.id = args.id;
    this.nickname = args.nickname;
    this.comment = args.comment;
    this.hashedPassword = args.hashedPassword;
  }

  static buildNew(args: {
    id: string;
    hashedPassword: HashedString;
  }): UserModel {
    return new UserModel({
      ...args,
      comment: null,
      nickname: args.id,
    });
  }

  public update(args: {
    nickname?: string;
    comment?: string | null;
  }): UserModel {
    return new UserModel({
      ...this,
      nickname: args.nickname === undefined ? this.nickname : args.nickname,
      comment: args.comment === undefined ? this.comment : args.comment,
    });
  }

  public markAsDeleted(): UserModel {
    return new UserModel({
      ...this,
      id: `${this.id}_deleted_${new Date().getTime()}`,
    });
  }
}
