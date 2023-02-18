import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import UserService from "./user.service";

@Controller("users/")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post("signin")
    async signIn(@Res() res: any, @Body() body: any) {
        res.status(200).json({
            message: "success",
            data: await this.userService.signIn(body),
        });
    }

    @Post("signup")
    async signUp(@Req() req: any, @Res() res: any) {
        const body = req.body;
        const data = await this.userService.createUser(body);
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
