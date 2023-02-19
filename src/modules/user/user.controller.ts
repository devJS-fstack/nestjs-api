import { Body, Controller, Get, Post, Req, Res, UsePipes } from "@nestjs/common";
import UserService from "./user.service";
import { BaseValidationPipe } from "../../validation/base";
import { signupSchema, loginSchema } from "../../validation/user";
import { IUser } from "../../schemas/user.schema";

@Controller("users/")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post("login")
    @UsePipes(new BaseValidationPipe(loginSchema))
    async signIn(@Res() res: any, @Body() body: IUser) {
        res.status(200).json({
            message: "success",
            data: await this.userService.login(body),
        });
    }

    @Post("register")
    @UsePipes(new BaseValidationPipe(signupSchema))
    async signUp(@Body() user: IUser, @Res() res) {
        const data = await this.userService.createUser(user);
        res.status(200).json({
            message: "success",
            data,
        });
    }

    @Get("")
    async getListUser(@Req() req: any, @Res() res: any) {
        res.status(200).json({
            message: "success",
            data: await this.userService.listUser(),
        });
    }
}
