import { Controller, Post, Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Request() req) {
    throw new Error('Not implemented');
  }
}