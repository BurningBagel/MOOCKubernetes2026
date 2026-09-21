import { Injectable } from '@nestjs/common';
import { TodoDTO } from 'shared/todo.dto';
import { Cron } from '@nestjs/schedule';
const fs = require('fs')
const path = require('path')
const { finished } = require('stream/promises')
const { Readable } = require('stream')

@Injectable()
export class AppService {
    
    // LOREM_PICSUM_URL = 'https://picsum.photos/1200';
    
    LOREM_PICSUM_URL : any = process.env.LOREM_PICSUM_URL;
    LOREM_PICSUM_FILE_PATH : any = process.env.LOREM_PICSUM_FILE_PATH;

    //FILENAME = 'lorem_img.png';
    
    // directory = path.join('/', 'usr', 'src', 'app', 'files')
    //directory = path.join('/','usr','src','app','data')
    //filePath = path.join(this.directory, this.FILENAME)


    //todoList : TodoDTO[] = [];

    //todoList : TodoDTO[] = [{ 'title': 'Test Todo' , 'complete': true, ID: 1}] //TEST TODO LIST



    
    async setupImage(): Promise<void>{
        try {
            const res = await fetch(this.LOREM_PICSUM_URL)
            if (!res.ok) throw new Error(`BAD REQUEST FETCHING IMAGE: ${res.statusText}`)
                
                const fileStream = fs.createWriteStream(this.LOREM_PICSUM_FILE_PATH);
                await finished(Readable.fromWeb(res.body).pipe(fileStream));
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    }
        
    @Cron('*/10 * * * *')
    updateImage(): void {
        this.setupImage()
    }
    
    
    }
