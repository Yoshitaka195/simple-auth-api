import { IsEmail, IsNumber } from 'class-validator';

export class FindInputDto {
  @IsNumber()
  readonly id: number;

  @IsEmail()
  readonly email: string;
}
