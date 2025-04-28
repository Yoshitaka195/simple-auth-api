import { IsEmail, IsNumber } from 'class-validator';

export class FindInputDto {
  @IsNumber()
  readonly id: string;

  @IsEmail()
  readonly email: string;
}
