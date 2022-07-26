import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import MongoDB from '../repository/connection/mongoDB'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,POST,PUT,PATCH'
  })
  const mongoDB = new MongoDB();
  await mongoDB.connect();
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
