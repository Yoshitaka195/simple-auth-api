import { UserModel } from '../../../domain/models/user.model';

export const JWT_LIBRARY_TOKEN = 'JWT_LIBRARY_TOKEN';

export interface IJwtLibrary {
  generateToken(user: UserModel): Promise<string>;
}
