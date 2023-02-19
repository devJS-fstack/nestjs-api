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
