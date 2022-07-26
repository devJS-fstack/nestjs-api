import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import UserService from '../user/user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('signin')
    async signIn() {
        return `User is logging...`
    }

    @Post('/signup')
    async signUp(@Req() req: any, @Res() res: any) {
        const body = req.body
        const data = await this.userService.createUser(body)
        res.status(200).json({
            message: 'success',
            data
        })
    }
}
