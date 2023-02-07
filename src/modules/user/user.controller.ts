import { Body, Controller, Get, Post, Query, Req, Res, UsePipes } from "@nestjs/common";
import UserService from "./user.service";
import PipeBefore from "../../core/validation/pipeBefore";

@Controller("")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post("user/signin")
    async signIn(@Res() res: any, @Body() body: any) {
        res.status(200).json({
            message: "success",
            data: await this.userService.signIn(body),
        });
    }

    @Post("user/signup")
    async signUp(@Req() req: any, @Res() res: any) {
        const body = req.body;
        const data = await this.userService.createUser(body);
        res.status(200).json({
            message: "success",
            data,
        });
    }

    @Get("users")
    async getListUser(@Req() req: any, @Res() res: any) {
        res.status(200).json({
            message: "success",
            data: await this.userService.listUser(),
        });
    }
}
