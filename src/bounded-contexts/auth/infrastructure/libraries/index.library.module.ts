import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWT_LIBRARY_TOKEN } from './core/i-jwt.library';
import { PASSWORD_ENCRYPTION_LIBRARY_TOKEN } from './core/i-password-encryption.library';
import { JwtLibrary } from './impl/jwt.library';
import { PasswordEncryptionLibrary } from './impl/password-encryption.library';

const libraries = [
  {
    provide: PASSWORD_ENCRYPTION_LIBRARY_TOKEN,
    useClass: PasswordEncryptionLibrary,
  },
  {
    provide: JWT_LIBRARY_TOKEN,
    useClass: JwtLibrary,
  },
];

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.jwt_secret'),
        signOptions: { expiresIn: '12h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...libraries],
  exports: [...libraries],
})
export class LibraryModule {}
