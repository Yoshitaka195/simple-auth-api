import { Module } from '@nestjs/common';

import { UsecaseModule } from '../../application/usecases/index.usecase.module';
import { BasicStrategy } from './core/basic.strategy';
import { LocalStrategy } from './core/local.strategy';

const strategies = [LocalStrategy, BasicStrategy];

@Module({
  imports: [UsecaseModule],
  exports: [...strategies],
  providers: [...strategies],
})
export class StrategyModule {}
