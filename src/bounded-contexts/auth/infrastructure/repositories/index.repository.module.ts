import { Module } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '../../domain/repositories/interface/i-user.repository';
import { UserRepository } from './impl/user.repository';

const repositories = [
  {  provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
];

@Module({
  imports: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
