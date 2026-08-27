import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as todoDto from 'shared/todo.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {appService.setupImage();}
  
  
  @Get('/todos')
  getTodos(){
    return this.appService.getTodos()
  }
  
  @Post('/todos')
  async postTodos(@Body() todoDTO : todoDto.TodoDTO){
    return await this.appService.postTodo(todoDTO)
  }


  
  
}
