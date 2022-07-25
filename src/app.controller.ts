import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  async getUsers(@Res() res: Response) {
    res.status(200).json({
      message: 'Success',
      data: await this.appService.getUsers(),
    });
  }
}
