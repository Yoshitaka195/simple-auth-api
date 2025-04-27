import { Injectable } from '@nestjs/common';
import { HashedString } from '../../../domain/models/user.model';
import { IPasswordEncryptionLibrary } from '../core/i-password-encryption.library';

@Injectable()
export class PasswordEncryptionLibrary implements IPasswordEncryptionLibrary {
  async encryptPassword(password: string): Promise<HashedString> {
    return password as HashedString;
  }

  async comparePassword(
    password: string,
    hashedPassword: HashedString,
  ): Promise<boolean> {
    return true;
  }
}
