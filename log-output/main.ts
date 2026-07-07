

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function logOutput(){
    let randomString = (Math.random() * 0xFFFFFFFFFFFFF).toString(16).slice(0, 10);
    while(true){
        console.log(new Date().toISOString(),':',randomString);    
        await delay(5000);
    }
}

logOutput();