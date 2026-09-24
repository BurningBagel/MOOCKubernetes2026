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
      
      await client.query("CREATE TABLE IF NOT EXISTS pingpong (pingpongcount NUMERIC(10,1));")
  
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
  
      const counter = (await client.query("SELECT * FROM pingpong;")).rows[0].pingpongcount;
  
      await client.query("UPDATE pingpong SET pingpongcount = $1::text",[String(counter+1)]);
  
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

    let result = (await client.query("SELECT * FROM pingpong;")).rows[0]

    await client.end()

    return String(result)
  }

}


/*

DONE Create both a PersistentVolume and PersistentVolumeClaim 
DONE and alter the Deployment to utilize it.
 As PersistentVolumes are often maintained by cluster administrators rather than developers and those are not application specific you should keep
  the definition for those separated, perhaps in own folder.

DONE Save the number of requests to the "Ping-pong" application into a file in the volume
 and output it with the timestamp and the random string when sending a request to our "Log output" application. 
 In the end, the two pods should share a persistent volume between the two applications.

*/