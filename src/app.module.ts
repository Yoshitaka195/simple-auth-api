import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllerModule } from './bounded-contexts/auth/interface/controllers/index.controller.module';
import configuration from './config/env/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV !== 'production'
          ? [`.env.${process.env.NODE_ENV}`]
          : ['.env'],
      load: [configuration],
    }),

    ControllerModule,
  ],
})
export class AppModule {}
