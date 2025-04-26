import { HashedString } from '../../../domain/models/user.model';

export const PASSWORD_ENCRYPTION_LIBRARY_TOKEN =
  'PASSWORD_ENCRYPTION_LIBRARY_TOKEN';

export interface IPasswordEncryptionLibrary {
  encryptPassword(password: string): Promise<HashedString>;
}
