import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AnimalSchema } from "../../schemas";
import { AnimalController } from "./animal.controller";
import { AnimalService } from "./animal.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: "animals", schema: AnimalSchema }])],
    controllers: [AnimalController],
    providers: [AnimalService],
})
export class AnimalModule {}
