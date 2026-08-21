import { Injectable } from '@nestjs/common';
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

  pingPong() : string {
    // return String(this.pingPongCounter++)
    return "HERE IS THE RETURN!!!!!"
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