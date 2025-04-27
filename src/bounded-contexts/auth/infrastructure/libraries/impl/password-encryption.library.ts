import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashedString } from '../../../domain/models/user.model';
import { IPasswordEncryptionLibrary } from '../core/i-password-encryption.library';

@Injectable()
export class PasswordEncryptionLibrary implements IPasswordEncryptionLibrary {
  private readonly saltRounds = 10;

  async encryptPassword(password: string): Promise<HashedString> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    return hashedPassword as HashedString;
  }

  async comparePassword(
    password: string,
    hashedPassword: HashedString,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}