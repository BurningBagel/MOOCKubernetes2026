import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { TodoDTO } from './shared/todo.dto';
import type {Response} from 'express';

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

  @Get('/break')
  breakHealth(){
    this.appService.breakHealth();
  }

  @Get('/health')
  getHealth(@Res() res : Response){
    if(this.appService.getHealth()){
      res.status(HttpStatus.OK).json({message:"healthy"})
    }
    else{
      res.status(HttpStatus.BAD_REQUEST).json({message:"not healthy"})
    }
  }
}
