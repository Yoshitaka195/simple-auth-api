import { Module } from '@nestjs/common';

import { UsecaseModule } from '../../application/usecases/index.usecase.module';
import { JwtStrategy } from './core/jwt.strategy';
import { LocalStrategy } from './core/local.strategy';

const strategies = [LocalStrategy, JwtStrategy];

@Module({
  imports: [UsecaseModule],
  exports: [...strategies],
  providers: [...strategies],
})
export class StrategyModule {}
