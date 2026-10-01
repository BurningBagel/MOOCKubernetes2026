import { Injectable } from '@nestjs/common';
import { TodoDTO } from './shared/todo.dto';
import { Client } from 'pg';

@Injectable()
export class AppService {
  private todos : TodoDTO[] = [];
  private idCounter = 0;

  async setup() : Promise<void>{

    const client = await this.refreshClient()

    try {
      await client.connect()
      
      await client.query("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY UNIQUE, title VARCHAR(255) NOT NULL, complete BOOLEAN DEFAULT 'false');")
  
      await client.query("TRUNCATE TABLE todos;")
    
      await client.end()
      
    } catch (error) {
      console.error(error)
      await client.end()
    }
  }

  async refreshClient() : Promise<Client> {
    return await new Client({
      user: 'postgres',
      database: 'postgres',
      password: 'example',
      host:'postgres-todos-svc',
      port: 5432
    })
  }

  async getTodos(): Promise<TodoDTO[]>{

    console.log("GET TODOS CALLED")
    
    const client = await this.refreshClient();
    
    try {
      await client.connect();
      const result = await client.query("SELECT * FROM todos;");
      console.log(result)
      client.end();

      return result.rows;
    } catch (error) {
      console.error(error)

      return [];
    }

  }

  async postTodo(todo : string){

    const client = await this.refreshClient();

    try {
      await client.connect();

      await client.query("INSERT INTO todos(id, title, complete) VALUES ($1,$2,$3);",[this.idCounter++,todo,false])
      
      await client.end();

    } catch (error) {
      console.error(error)
    }


    // this.todos.push(newTodo);
  }
}
