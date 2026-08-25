import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("pingpong")
  getPingPong(): string {
    return this.appService.getPingPong();
  }

  @Get("pings")
  getPings(): string {
    return this.appService.getPings();
  }
}
