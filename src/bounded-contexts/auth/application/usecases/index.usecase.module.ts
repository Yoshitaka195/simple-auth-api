import { Module } from '@nestjs/common';
import { LibraryModule } from '../../infrastructure/libraries/index.library.module';
import { RepositoryModule } from '../../infrastructure/repositories/index.repository.module';
import { AUTH_USECASE_TOKEN } from './core/i-auth.usecase';
import { USER_USECASE_TOKEN } from './core/i-user.usecase';
import { AuthUsecase } from './impl/auth.usecase';
import { UserUsecase } from './impl/user.usecase';

const usecases = [
  { provide: AUTH_USECASE_TOKEN, useClass: AuthUsecase },
  { provide: USER_USECASE_TOKEN, useClass: UserUsecase },
];

@Module({
  imports: [RepositoryModule, LibraryModule],
  exports: [...usecases],
  providers: [...usecases],
})
export class UsecaseModule {}
