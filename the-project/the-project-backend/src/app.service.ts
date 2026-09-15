import { Injectable } from '@nestjs/common';
import { TodoDTO } from 'shared/todo.dto';
import { Cron } from '@nestjs/schedule';
const fs = require('fs')
const path = require('path')
const { finished } = require('stream/promises')
const { Readable } = require('stream')

@Injectable()
export class AppService {
    
    LOREM_PICSUM_URL = 'https://picsum.photos/1200';
    FILENAME = 'lorem_img.png';
    
    // directory = path.join('/', 'usr', 'src', 'app', 'files')
    directory = path.join('/','usr','src','app','data')
    filePath = path.join(this.directory, this.FILENAME)


    //todoList : TodoDTO[] = [];

    //todoList : TodoDTO[] = [{ 'title': 'Test Todo' , 'complete': true, ID: 1}] //TEST TODO LIST



    
    async setupImage(): Promise<void>{
        const res = await fetch(this.LOREM_PICSUM_URL)
        if (!res.ok) throw new Error(`ERROR FETCHING IMAGE: ${res.statusText}`)
            
            const fileStream = fs.createWriteStream(this.filePath);
            await finished(Readable.fromWeb(res.body).pipe(fileStream));
    }
        
    @Cron('*/10 * * * *')
    updateImage(): void {
        this.setupImage()
    }
    
    
    }
