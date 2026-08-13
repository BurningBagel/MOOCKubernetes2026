import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron } from '@nestjs/schedule';
const fs = require('fs')
const path = require('path')
const { finished } = require('stream/promises')
const { Readable } = require('stream')

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {this.setupImage();}

  LOREM_PICSUM_URL = 'https://picsum.photos/1200';
  FILENAME = 'lorem_img.png';
  
  // directory = path.join('/', 'usr', 'src', 'app', 'files')
  directory = path.join('/')
  filePath = path.join(this.directory, 'timestampedStrings.txt')

  async setupImage(): Promise<void>{
    const res = await fetch(this.LOREM_PICSUM_URL)
    if (!res.ok) throw new Error(`ERROR FETCHING IMAGE: ${res.statusText}`)
    
    const fileStream = fs.createWriteStream(this.FILENAME);
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
  }

  @Cron('*/5 * * * * *')
  updateImage(): void {
    this.setupImage()
  }
  
}
