import { Injectable } from '@nestjs/common';
import { TodoDTO } from './shared/todo.dto';

@Injectable()
export class AppService {
  private todos : TodoDTO[] = [];
  private idCounter = 0;


  getTodos(): TodoDTO[]{
    return this.todos;
  }

  postTodos(todo : string){
    let newTodo : TodoDTO = {
      ID: this.idCounter++,
      title: todo,
      complete: false
    }
    console.log(todo)
    this.todos.push(newTodo);
    console.log(this.todos)
  }
}
