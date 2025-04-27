import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../../../domain/models/user.model';
import { IJwtLibrary } from '../core/i-jwt.library';

@Injectable()
export class JwtLibrary implements IJwtLibrary {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: UserModel): Promise<string> {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
