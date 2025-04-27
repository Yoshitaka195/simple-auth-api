import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as fastify from 'fastify';
import { AppModule } from './app.module';
import { healthCheck } from './common/middleware/health-check.middleware';

export async function bootstrap(): Promise<void> {
  const serverOptions: fastify.FastifyServerOptions = {
    logger: true,
  };
  const instance: fastify.FastifyInstance = fastify.default(serverOptions);
  const nestApp = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
  );

  nestApp.use(healthCheck);
  await nestApp.listen(3333, '0.0.0.0');
  console.log(`Application is running on: ${await nestApp.getUrl()} 🚀`);
}

bootstrap();
