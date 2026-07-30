import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  private pingPongCounter = 0;

  pingPong(): string {
    return 'pong ' + String(this.pingPongCounter++);
  }
}
