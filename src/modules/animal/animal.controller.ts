import { Controller, Get, Param, Query, UsePipes } from "@nestjs/common";
import { ingestDataFrom3Party, getAnimal } from "../../validation/animal";
import { AnimalService } from "./animal.service";
import { BaseValidationPipe } from "../../validation/base";

@Controller("animals")
export class AnimalController {
    constructor(private animalService: AnimalService) {}
    @Get("ingest-data")
    @UsePipes(new BaseValidationPipe(ingestDataFrom3Party))
    async ingestDataFrom3Party(@Query() query) {
        const { type, totalPage } = query;
        return this.animalService.ingestDataFrom3Party({ type, totalPage });
    }

    @Get("")
    @UsePipes(new BaseValidationPipe(getAnimal))
    async getList(@Query() query) {
        const limit = 10;
        const { page = 1, type } = query;
        const skip = (page - 1) * limit;
        console.log("::: GET ANIMAL :::");
        return this.animalService.getList({ limit, skip, type });
    }

    @Get("/:id")
    async getById(@Param() param) {
        console.log("::: GET ANIMAL BY ID :::", param);
        return this.animalService.getById(param.id);
    }
}
