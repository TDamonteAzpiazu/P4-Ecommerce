import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middleware/loggerGlobal';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerMiddleware)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3000);
}
bootstrap();
