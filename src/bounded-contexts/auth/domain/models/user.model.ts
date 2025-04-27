export type HashedString = string & { readonly __brand: unique symbol };

/**
 * ユーザーモデル
 */
export class UserModel {
  /**
   * ユーザーID
   */
  id: number | null;

  /**
   * ユーザー名
   */
  name: string;

  /**
   * メールアドレス
   */
  email: string;

  /**
   * パスワード
   */
  hashedPassword: HashedString;

  constructor(args: {
    id: number | null;
    name: string;
    email: string;
    hashedPassword: HashedString;
  }) {
    this.id = args.id;
    this.name = args.name;
    this.email = args.email;
    this.hashedPassword = args.hashedPassword;
  }

  static buildNew(args: {
    name: string;
    email: string;
    hashedPassword: HashedString;
  }): UserModel {
    return new UserModel({
      ...args,
      id: null,
    });
  }

  public update(args: {
    name?: string;
  }): UserModel {
    return new UserModel({
      ...this,
      ...args,
    });
  }
}
