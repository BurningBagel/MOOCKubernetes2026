import { Injectable } from '@nestjs/common';
import { get, IncomingMessage } from 'http';
const fs = require("fs");
const path = require('path');




@Injectable()
export class AppService {
  directory = path.join('/', 'usr', 'src', 'app', 'files')
  filePath = path.join(this.directory, 'timestampedStrings.txt')

  // pingpongDirectory = path.join('/', 'usr', 'src', 'app', 'count')
  // pingpongFilePath = path.join(this.pingpongDirectory, 'pingpongcount.txt')

  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  content = "";


  async updateContent() {

    while (true) {
      try {
        fs.readFile(this.filePath, 'utf8', (err, data) => {
          this.content = "";
          this.content = data;
        });

      } catch (error) {
        console.log(error)
        await this.delay(5000)
      }
      await this.delay(5000)
    }
  }


  async getCode(): Promise<string> {

    
    return new Promise<string>((resolve,reject) => {
      
        // answer = this.content.concat('<p>ping pong counter = ',fs.readFileSync(this.pingpongFilePath, {encoding: 'utf8', flag: 'r'},'</p>'));
        get('http://localhost:3001/pingpong', (res: IncomingMessage) => {
          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            try {
              console.log("in get: " + rawData)
              resolve(rawData)
            } catch (error) {
              reject(error)
              console.error(error);
            }
          });
        }).on('error', (e) => {
          console.error(`Got error: ${e.message}`);
        });


      })

    
    // await fs.readFileSync(this.pingpongFilePath, 'utf8', (err, data) =>{
    //     this.content += '\n\nping pong counter = ' + data;
    // });

  }


}
