import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {this.appService.updateContent()}

  @Get()
  async getCode(): Promise<string> {
    return await this.appService.getCode();
  }

  @Get("ready")
  async getReady(@Res() res:Response) {
    if(await this.appService.getReady()){
      res.status(HttpStatus.OK).json({message:'Ready'})
    }
    else{
      res.status(HttpStatus.BAD_REQUEST).json({message:'Not ready yet!'})
    }
  } 

}
