import { Injectable } from '@nestjs/common';
import { get, IncomingMessage } from 'http';
const fs = require("fs");
const path = require('path');
type errorType = {"message":String,"error":String,"statusCode":Number}




@Injectable()
export class AppService {
  directory = path.join('/', 'usr', 'src', 'app', 'files')
  filePath = path.join(this.directory, 'timestampedStrings.txt')

  configDirectory = path.join('/', 'usr', 'src', 'app', 'config')
  configFilePath = path.join(this.configDirectory, 'information.txt')
  
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
      let configEnvVariable = "<p>env variable: " + process.env.MESSAGE + "</p>";
      let configFileContent = "<p>file content: ";
      try {
        configFileContent = configFileContent.concat(fs.readFileSync(this.configFilePath, 'utf8'),'</p>');
      } catch (error) {
        console.error("Error reading config file:", error);
      }
      
      get('http://ping-pong-svc:2345/pings', (res: IncomingMessage) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
              let answer = this.content.concat('<p>ping pong counter = ',rawData,'</p>');
              answer = configEnvVariable + configFileContent + answer;
              resolve(answer)
            } catch (error:any) {
              reject("ERROR: " + error["message"])
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
