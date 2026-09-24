import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

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
}
