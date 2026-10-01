import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TodoDTO } from './shared/todo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {appService.setup()}

  @Get('/todos')
  async getTodos(): Promise<TodoDTO[]> {
    return await this.appService.getTodos();
  }

  @Post('/todos')
  async postTodos(@Body() body) : Promise<void> {
    await this.appService.postTodo(body.todo);
  }
}
