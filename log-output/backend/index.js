const fs = require('node:fs');
const path = require('path');


const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'timestampedStrings.txt')

const fileAlreadyExists = async () => new Promise(res => {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const findAFile = async () => {
  if (await fileAlreadyExists()) return

  await new Promise(res => fs.mkdir(directory, (err) => res()))
}


async function main(){

    await findAFile();

    
    const randomString = (Math.random() * 0xFFFFFFFFFFFFF).toString(16).slice(0, 10);
    
    let delay = (ms) => new Promise(res => setTimeout(res, ms));
    
    
    
    while(true){
        //   console.log(this.generateCode());
        let content = String(new Date().toISOString()+':'+randomString);
    
        fs.writeFile(filePath, content+'\n', {flag:'a+'}, err => {
          if (err) {
            console.error(err);
          } else {
            // file written successfully
          }
        });
    
        await delay(5000);
    }
}

main();




