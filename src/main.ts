import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,POST,PUT,PATCH',
    maxAge: 30
  })
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
