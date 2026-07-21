import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  randomString = (Math.random() * 0xFFFFFFFFFFFFF).toString(16).slice(0, 10);

  getCode() : string {
    return this.generateCode();
  }


  async logOutput(){
    while(true){
      console.log(this.generateCode());    
      await this.delay(5000);
    }
  }


  private generateCode() : string {
    return String(new Date().toISOString()+':'+this.randomString);
  }
}
