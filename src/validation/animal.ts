import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { ObjectSchema } from "joi";
import { validateNumber, validateString } from "./common";
import * as Joi from "joi";

export const ingestDataFrom3Party = Joi.object({
    type: validateString("type"),
    totalPage: validateNumber("totalPage"),
});

export const getAnimal = Joi.object({
    type: validateString("type"),
    page: validateNumber("page").optional(),
});

@Injectable()
export class AnimalValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    transform(data: any, metadata: ArgumentMetadata) {
        const { error, value } = this.schema.validate(data);
        if (error) {
            throw new BadRequestException("Validation failed", error.message);
        }
        return value;
    }
}
