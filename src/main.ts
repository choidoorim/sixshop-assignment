import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swaggerBuilder from '@app/config/swagger-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerBuilder(app, {
    title: 'Commerce',
    description: '',
    version: '',
  });

  await app.listen(3000);
}
bootstrap();
