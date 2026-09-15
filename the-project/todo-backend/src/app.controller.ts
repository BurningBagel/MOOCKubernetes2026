import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { TodoDTO } from './shared/todo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todos')
  getTodos(): TodoDTO[] {
    return this.appService.getTodos();
  }

  @Post('/todos')
  postTodos(@Body() todo) : void {
    this.appService.postTodos(todo.todo);
  }
}
