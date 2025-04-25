import { Module } from '@nestjs/common';

import { RepositoryModule } from '../../infrastructure/repositories/index.repository.module';
import { UserUsecase } from './impl/user.usecase';

const usecases = [
  UserUsecase
];

@Module({
  imports: [RepositoryModule],
  exports: [...usecases],
  providers: [...usecases],
})
export class UsecaseModule {}
