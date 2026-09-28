import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
const fs = require("fs");
const path = require('path');

@Injectable()
export class AppService {

  // private directory = path.join('/', 'usr', 'src', 'app','count')
  // private filePath = path.join(this.directory, 'pingpongcount.txt')

  private pingPongCounter = 0;

  // pingPong(): string {
  //   let content = this.pingPongCounter + 1;
  //   fs.writeFile(this.filePath, String(content), {flag:'w+'}, err => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       // file written successfully
  //     }
  //   });

  //   return 'pong ' + String(this.pingPongCounter++);
  // }

  async connectClient() : Promise<Client>{
    return await new Client({
      user: 'postgres',
      database: 'postgres',
      password: 'example',
      host:'postgres-svc',
      port: 5432
    });
  }

  async setup() : Promise<void> {
    const client = await this.connectClient()

    try {
      await client.connect()
      
      await client.query("CREATE TABLE IF NOT EXISTS pingpong (pingpongcount NUMERIC(10,0));")
  
      await client.query("TRUNCATE TABLE pingpong;")
  
      await client.query("INSERT INTO pingpong (pingpongcount) VALUES (0);")
  
      await client.end()
      
    } catch (error) {
      console.error(error)
      await client.end()
    }
  }

  async getPingPong() : Promise<string> {

    const client = await this.connectClient();

    try {
      
      await client.connect();

      const counter = Number((await client.query("SELECT * FROM pingpong;")).rows[0]['pingpongcount'])+1;
  
      await client.query("UPDATE pingpong SET pingpongcount = $1::numeric",[String(counter)]);
  
      await client.end();
  
      return String(counter);
      
    } catch (error) {
      
      console.error(error);

      await client.end();
      
      return '-1';

    }
    
  }

  async getPings(): Promise<string> {
    const client = await this.connectClient();

    await client.connect()

    let result = (await client.query("SELECT * FROM pingpong;")).rows[0]['pingpongcount']

    await client.end()

    return String(result)
  }

}

