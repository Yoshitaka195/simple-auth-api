import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UpdateInputDto {
  // ニックネーム
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @ValidateIf((o) => !o.comment)
  @IsNotEmpty()
  nickname?: string | undefined;

  // コメント
  @IsString()
  @MinLength(0)
  @MaxLength(100)
  @ValidateIf((o) => !o.nickname)
  @IsNotEmpty()
  comment?: string | undefined;
}