import { validateString, validateEnumString } from "./common";
import * as Joi from "joi";

export const signupSchema = Joi.object({
    email: validateString("email"),
    username: validateString("username"),
    fullName: validateString("fullName"),
    password: Joi.when("typeLogin", {
        is: "DEFAULT",
        then: validateString("password"),
    }),
    typeLogin: validateEnumString(["FACEBOOK", "GOOGLE", "DEFAULT"], "typeLogin"),
});

export const loginSchema = Joi.object({
    username: Joi.when("typeLogin", {
        is: "DEFAULT",
        then: validateString("username"),
    }),
    password: Joi.when("typeLogin", {
        is: "DEFAULT",
        then: validateString("password"),
    }),
    email: Joi.when("typeLogin", {
        is: Joi.valid("FACEBOOK", "GOOGLE"),
        then: validateString("email"),
    }),
    typeLogin: validateEnumString(["FACEBOOK", "GOOGLE", "DEFAULT"], "typeLogin"),
});
