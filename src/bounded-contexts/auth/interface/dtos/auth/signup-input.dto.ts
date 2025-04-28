
import { Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignupInputDto {
  // ユーザーID
  @Expose({ name: 'user_id' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  userId: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
