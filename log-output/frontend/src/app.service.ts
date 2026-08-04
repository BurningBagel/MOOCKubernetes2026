import { Injectable } from '@nestjs/common';
const fs = require("fs");
const path = require('path');




@Injectable()
export class AppService {
  directory = path.join('/', 'usr', 'src', 'app', 'files')
  filePath = path.join(this.directory, 'timestampedStrings.txt')
  
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

  
  getCode() : string {
    return this.content;
  }


}
