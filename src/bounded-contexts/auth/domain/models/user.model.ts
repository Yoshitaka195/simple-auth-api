/**
 * ユーザーモデル
 */
export class UserModel {
  /**
   * ユーザーID
   */
  id: number;

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
  password: string;

  constructor({
    id,
    name,
    email,
    password,
  }: {
    id: number;
    name: string;
    email: string;
    password: string;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static buildNewAccount({
    id,
    name,
    email,
    password,
  }: {
    id: number;
    name: string;
    email: string;
    password: string;
  }): UserModel {
    return new UserModel({
      id,
      name,
      email,
      password,
    });
  }
}
