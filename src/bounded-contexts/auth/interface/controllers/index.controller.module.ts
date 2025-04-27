import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsecaseModule } from '../../application/usecases/index.usecase.module';
import { RepositoryModule } from '../../infrastructure/repositories/index.repository.module';
import { StrategyModule } from '../strategies/index.strategy.module';
import { AuthController } from './impl/auth.controller';

const controllers = [AuthController];

@Module({
  imports: [UsecaseModule, StrategyModule, PassportModule, RepositoryModule],
  providers: [...controllers],
  controllers: [...controllers],
})
export class ControllerModule {}
