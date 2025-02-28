
const fs = require('fs')
const rootDir = require('../utils/path')
const path = require('path');

const movies = [];

// const directoryName = 'data';
// const directoryPath = path.join(rootDir, directoryName);


let p = path.join(rootDir,'data','movies.json');


function readAllMovies(callback){
    fs.readFile(p,(err,content)=>{
        if(err){
            callback([])
        }
        else{
            callback(JSON.parse(content))
        }
    })
}


module.exports = class Movie{
    constructor(title,desc,tags,rating){
        this.id = Math.random().toString();
        this.title = title
        this.desc = desc
        this.tags= tags
        this.rating=rating;
    }
    save(){
        readAllMovies((movies)=>{
                let newMovies = []
                if(movies.length > 0){
                    newMovies = JSON.stringify([...movies,this]);
                }
                else{
                    newMovies  = JSON.stringify([this]);
                }
                fs.writeFile(p,newMovies,(err)=>{
                    if(err){console.log("data err")}
                    else console.log("data successful")
                })
        })
        // movies.push(this)
    }
    static deleteMovie(){
        // TODO: HOMEWORK try to complete it by Monday
        // based on title....
        // delete based on the id... 
    }
     static getAllMovie(callback){
        readAllMovies(callback)
    }
}


