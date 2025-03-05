const fs = require('fs')
const rootDir = require('../utils/path')
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const url={};


let p = path.join(rootDir,'data','urls.json');

function readAllUrls(callback){
    fs.readFile(p,(err,content)=>{
        if(err){
            callback({})
        }
        else{
            callback(JSON.parse(content))
        }
    })
}
async function generate(){
    const { nanoid } = await import("nanoid");
    return nanoid(6);
};
module.exports = class Url{
    constructor(originalUrl){
            this.short_url = "";
            this.originalUrl = originalUrl
        }
        async save(cb){
             readAllUrls(async (urls)=>{
                    // let urls = {}
                    console.log(urls)
                    console.log(this)
                    // const {this.short_url} = this.originalUrl; 
                    // const short = this.short_url;
                    this.short_url = await generate();
                    const u ={
                        [this.short_url]:this.originalUrl
                    }
                    const received_urls = JSON.stringify({...urls,...u})


                    fs.writeFile(p,received_urls,(err)=>{
                        if(err){console.log("data err")}
                        else {console.log("data successful")}
                        const local_url = `http://localhost:3000/short/${this.short_url}`
                        cb(local_url)
                        
                    })
            })
           
        }
        static findByKey(key,cb){
        readAllUrls((urls)=>{
                    const url = urls[key];
                    const dummyLink = "https://google.com"
                    if(url)
                        cb(url)
                    else 
                        cb(dummyLink)
        })
        }
}