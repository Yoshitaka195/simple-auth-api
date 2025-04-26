import { Module } from '@nestjs/common';
import { PASSWORD_ENCRYPTION_LIBRARY_TOKEN } from './core/i-password-encryption.library';
import { PasswordEncryptionLibrary } from './impl/password-encryption.library';

const libraries = [
  { provide: PASSWORD_ENCRYPTION_LIBRARY_TOKEN, useClass: PasswordEncryptionLibrary },
];

@Module({
  imports: [],
  providers: [...libraries],
  exports: [...libraries],
})
export class LibraryModule {}
