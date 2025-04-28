import { Module } from '@nestjs/common';

import { UsecaseModule } from '../../application/usecases/index.usecase.module';
import { BasicStrategy } from './core/basic.strategy';

const strategies = [BasicStrategy];

@Module({
  imports: [UsecaseModule],
  exports: [...strategies],
  providers: [...strategies],
})
export class StrategyModule {}
