import { IsEmail } from 'class-validator';

export class FindByEmailInputDto {
  @IsEmail()
  readonly email: string;
}
