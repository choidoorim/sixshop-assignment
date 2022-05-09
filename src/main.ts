import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import swaggerBuilder from '@app/config/swagger-builder';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerBuilder(app, {
    title: 'Commerce',
    description: '',
    version: '',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();
