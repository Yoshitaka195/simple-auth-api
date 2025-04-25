import { Module } from '@nestjs/common';

import { RepositoryModule } from '../../infrastructure/repositories/index.repository.module';

import { UserStrategy } from './core/user.strategy';
import { USER_STATEGY_TOKEN } from './interface/i-user.strategy';

const strategies = [{ provide: USER_STATEGY_TOKEN, useClass: UserStrategy }];

@Module({
  imports: [RepositoryModule],
  exports: [...strategies],
  providers: [...strategies],
})
export class StrategyModule {}
