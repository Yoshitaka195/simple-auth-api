import { Module } from '@nestjs/common';
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
  imports: [],
  providers: [...libraries],
  exports: [...libraries],
})
export class LibraryModule {}
