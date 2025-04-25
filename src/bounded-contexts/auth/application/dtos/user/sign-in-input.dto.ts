import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class SignInInputDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  externalAccountId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  email?: string | null;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('JP', {
    message: '電話番号は日本国内の電話番号形式で入力してください',
  })
  tel?: string | null;

  @IsOptional()
  @IsString()
  @IsUrl(
    { require_protocol: true, protocols: ['http', 'https'] },
    { message: '画像URLは正しいURL形式（httpまたはhttps）で入力してください' },
  )
  imageUrl?: string | null;

  constructor(args: {
    externalAccountId: string;
    name?: string | null;
    email?: string | null;
    imageUrl?: string | null;
  }) {
    this.externalAccountId = args.externalAccountId;
    this.name = args.name;
    this.email = args.email;
    this.imageUrl = args.imageUrl;
  }
}
