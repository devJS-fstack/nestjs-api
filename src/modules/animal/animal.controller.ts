import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import { AnimalValidationPipe, ingestDataFrom3Party, getAnimal } from "../../validation/animal";
import { AnimalService } from "./animal.service";

@Controller("animals")
export class AnimalController {
    constructor(private animalService: AnimalService) {}
    @Get("ingest-data")
    @UsePipes(new AnimalValidationPipe(ingestDataFrom3Party))
    async ingestDataFrom3Party(@Query() query) {
        const { type, totalPage } = query;
        return this.animalService.ingestDataFrom3Party({ type, totalPage });
    }

    @Get("")
    @UsePipes(new AnimalValidationPipe(getAnimal))
    async get(@Query() query) {
        const limit = 20;
        const { page = 1, type } = query;
        const skip = (page - 1) * limit;
        console.log("::: GET ANIMAL :::");
        return this.animalService.get({ limit, skip, type });
    }
}
