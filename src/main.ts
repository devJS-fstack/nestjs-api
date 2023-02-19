import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import * as mongoose from "mongoose";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    mongoose.set("debug", true);
    app.enableCors({
        origin: true,
        methods: "GET,POST,PUT,PATCH,DELETE",
        maxAge: 30,
    });
    await app.listen(process.env.PORT || 3900);
}
bootstrap();
