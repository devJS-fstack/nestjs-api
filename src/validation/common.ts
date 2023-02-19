import * as Joi from "joi";

export interface ArgumentMetaData {
    type: "body" | "query" | "param";
    metatype?: any;
    data?: string;
}

export const validateDate = (field: string) => {
    return Joi.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            "any.required": `${field} is missing`,
            "string.pattern.base": `${field} must be in the format of YYYY-MM-DD`,
        });
};

export const validateString = (field: string) => {
    return Joi.string()
        .required()
        .messages({
            "any.required": `${field} is missing`,
            "string.empty": `${field} is empty`,
        });
};

export const validateStringId = (field: string) => {
    return Joi.string()
        .required()
        .length(24)
        .messages({
            "any.required": `${field} is missing`,
            "string.empty": `${field} is empty`,
            "string.length": `${field} is invalid`,
        });
};

export const validateEnumString = (enumString: string[], field: string) => {
    return Joi.string()
        .required()
        .valid(...enumString)
        .messages({
            "any.required": `${field} is missing`,
            "string.empty": `${field} is empty`,
            "any.only": `${field} is invalid`,
        });
};

export const validateNumber = (field: string) => {
    return Joi.number()
        .required()
        .messages({
            "any.required": `${field} is missing`,
            "number.base": `${field} must be a number`,
        });
};

export const validateBoolean = (field: string) => {
    return Joi.boolean()
        .required()
        .messages({
            "any.required": `${field} is missing`,
            "boolean.base": `${field} must be a boolean`,
        });
};
