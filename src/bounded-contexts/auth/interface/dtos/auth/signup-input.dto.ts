import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupInputDto {
  // 名前
  @IsString()
  @MinLength(1) // 名前の最低文字数
  @MaxLength(20) // 名前の最大文字数
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8) // パスワードの最低文字数
  @MaxLength(20)
  password: string;
}
