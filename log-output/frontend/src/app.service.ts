import { Injectable } from '@nestjs/common';
const fs = require("fs");
const path = require('path');




@Injectable()
export class AppService {
  directory = path.join('/', 'usr', 'src', 'app', 'files')
  filePath = path.join(this.directory, 'timestampedStrings.txt')

  pingpongDirectory = path.join('/', 'tmp', 'kube')
  pingpongFilePath = path.join(this.pingpongDirectory, 'pingpongcount.txt')
  
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  content = "";

  async updateContent() {
    
    while(true){
      fs.readFile(this.filePath, 'utf8', (err, data) =>{
        this.content = data;
      });
      await this.delay(5000)
    }
  }

  
  async getCode() : Promise<string> {

    this.content += '\n\nping pong counter = ' + fs.readFileSync(this.pingpongFilePath, {encoding: 'utf8', flag: 'r'});
    // await fs.readFileSync(this.pingpongFilePath, 'utf8', (err, data) =>{
    //     this.content += '\n\nping pong counter = ' + data;
    // });


    return this.content;
  }


}
