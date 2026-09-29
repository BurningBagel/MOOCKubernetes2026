import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todos')
  async getTodos(): Promise<string> {
    return await JSON.stringify(this.appService.getTodos());
  }

  @Post('/todos')
  async postTodos(@Body() body) : Promise<void> {
    await this.appService.postTodo(body.todo);
  }
}
