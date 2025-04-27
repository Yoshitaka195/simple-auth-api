import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateInputDto {
  // 名前
  @IsString()
  @MinLength(1) // 名前の最低文字数
  @MaxLength(20) // 名前の最大文字数
  name: string;
}
