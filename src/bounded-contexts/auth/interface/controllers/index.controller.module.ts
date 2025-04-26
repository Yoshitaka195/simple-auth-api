import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { StrategyModule } from '../../application/strategies/index.strategy.module';
import { UsecaseModule } from '../../application/usecases/index.usecase.module';
import { RepositoryModule } from '../../infrastructure/repositories/index.repository.module';

const controllers = [];
@Module({
  imports: [UsecaseModule, StrategyModule, PassportModule, RepositoryModule],
  providers: [...controllers],
})
export class ControllerModule {}
