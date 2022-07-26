import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from '../user/user.module';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../../config/mongo.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(mongoConfig.url),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
