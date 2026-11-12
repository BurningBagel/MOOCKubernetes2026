import { Injectable } from '@nestjs/common';

@Injectable()
export class BroadcasterService {
  getHello(): string {
    return 'Hello World!';
  }

  testService(data : any){
    console.log(data)
  }

  async forwardMessage(data: any){
    const response = await fetch(String(process.env.BROADCASTER_URL),{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: 'bot',
        message: 'A todo was created'
      })
    })

    if(!response.ok){
      throw new Error("Broadcaster message forwarding failed! "+response.status)
    }


  }
}
