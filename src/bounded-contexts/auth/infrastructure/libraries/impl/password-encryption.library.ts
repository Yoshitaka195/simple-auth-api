import { HashedString } from '../../../domain/models/user.model';
import { IPasswordEncryptionLibrary } from '../core/i-password-encryption.library';

export class PasswordEncryptionLibrary implements IPasswordEncryptionLibrary {
  async encryptPassword(password: string): Promise<HashedString> {
    return password as HashedString;
  }
}
