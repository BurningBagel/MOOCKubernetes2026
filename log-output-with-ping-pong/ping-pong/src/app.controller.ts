import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {this.appService.setup();}

  @Get("pingpong")
  async getPingPong(): Promise<string> {
    return await this.appService.getPingPong();
  }

  @Get("pings")
  async getPings(): Promise<string> {
    return await this.appService.getPings();
  }

  @Get("ready")
  getReady(@Res() res: Response) {
    if (this.appService.getReady()){
      res.status(HttpStatus.OK).json({message:'Ready!'})
    }
    else{
      res.status(HttpStatus.BAD_REQUEST).json({message:'Not ready yet!'})
    }
  }
}
