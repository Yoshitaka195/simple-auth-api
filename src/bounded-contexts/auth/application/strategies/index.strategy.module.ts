import { Module } from '@nestjs/common';
import { UsecaseModule } from '../usecases/index.usecase.module';
import { JwtStrategy } from './core/jwt.strategy';

const strategies = [JwtStrategy];

@Module({
  imports: [UsecaseModule],
  exports: [...strategies],
  providers: [...strategies],
})
export class StrategyModule {}
