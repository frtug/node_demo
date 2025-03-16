const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    desc:{
        type:String,
        required: true
    },
    rating:{
        type:Number,
        required: true
    },
    tags:{
        type:String,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    },{ timestamps: true })
module.exports = mongoose.model('Movie',movieSchema)


// const getDb = require('../utils/database').getDb
// const mongodb = require('mongodb')


// module.exports = class Movie{
//     constructor(title,desc,tags,rating,id){
//         this.title = title
//         this.desc = desc
//         this.tags= tags
//         this.rating=rating;
//         this._id = new mongodb.ObjectId(id)
//     }
//      save(){
//         try{
//             const db = getDb();
//             console.log(this._id)
//             return  db.collection('movies').insertOne(this).then((res)=>{
//                 console.log(res)
//                 return res;
//             }).catch((err)=>{
//                 console.log("error while saving")
//                 throw err;
//             })
//         }catch(err){
//                 console.log("error saving to mongo")
//             } 
//     }
//     update(){
//         try{
//             if(this._id){
//                 console.log("id is there",this._id)
//             }
//             const db = getDb();
//             return db.collection('movies').updateOne({_id:this._id},{$set:this}).then((res)=>{
//                 console.log("result")
//             }).catch((err)=>{
//                 console.log("error while saving")
//                 throw err;
//             })
//         }catch(err){
//                 console.log("error saving to mongo")
//             }
//     }
//     static findByid(id){
//         const db = getDb();
//        return db.collection('movies').find({_id:mongodb.ObjectId(id)}).then(
//         (res)=> {
//             console.log(res)
//             return res;
//         })
//     }
//     static getAllMovie(){
//         const db = getDb();
//         console.log("came till here 2")
//         return db.collection('movies').find().toArray().then(
//             (res)=> {
//                 console.log(res)
//                 return res
//             }  
//         ).catch(err=>console.log('err',err))
//     }
//     static deleteMovie(id){
//         const db = getDb();
//         console.log("came till here 2")
//         return db.collection('movies').deleteOne({_id:new mongodb.ObjectId(id)}).then(
//             (res)=> {
//                 console.log(res)
//                 return res
//             }  
//         ).catch(err=>console.log('err',err))
//     }
// }




// const fs = require('fs')
// const rootDir = require('../utils/path')
// const path = require('path');
// const { url } = require('inspector');

// const movies = [];

// const directoryName = 'data';
// const directoryPath = path.join(rootDir, directoryName);


// let p = path.join(rootDir,'data','movies.json');


// function readAllMovies(callback){
//     fs.readFile(p,(err,content)=>{
//         if(err){
//             callback([])
//         }
//         else{
//             callback(JSON.parse(content))
//         }
//     })
// }


// module.exports = class Movie{
//     constructor(title,desc,tags,rating){
//         this.id = Math.random().toString();
//         this.title = title
//         this.desc = desc
//         this.tags= tags
//         this.rating=rating;
//     }
//     save(cb){
//         readAllMovies((movies)=>{
//                 let newMovies = []
//                 if(movies.length > 0){
//                     newMovies = JSON.stringify([...movies,this]);
//                 }
//                 else{
//                     newMovies  = JSON.stringify([this]);
//                 }
//                 fs.writeFile(p,newMovies,(err)=>{
//                     if(err){console.log("data err")}
//                     else {console.log("data successful")}
//                     cb(null)
                    
//                 })
//         })
//         // movies.push(this)
//     }
//     static deleteMovie(id,cb){
//         // TODO: HOMEWORK try to complete it by Monday
//         // based on title....
//         // delete based on the id... 
//         readAllMovies((movies)=>{
//             const movie = movies.find(movie => movie.id === id);
//             // delted movies, later we can use it.....
//             const new_movies = movies.filter(movie  =>movie.id !== id)
//             //does the write file operation
//             fs.writeFile(p,JSON.stringify(new_movies),err =>{
//                 if(err) console.log("error while writing in")
//                 cb(null)
//             }) 
            
//         })
//     }
//      static getAllMovie(callback){
//         readAllMovies(callback)
//     }
// }


//  Can You create a URL shortner using node js. With File system 
// .json

// .ejs

// Input --- 

// ----Create url


// --route /convert url

// https://stackoverflow.com/questions -> 

// function randomstring(len=10){

// }

// data.json

// {
//     "key123" : "https://www.google.com/search?q=navigator.clipboard.writetext+error&num=10&sca_esv=d0d3ba676e08ed7a&sxsrf=AHTn8zpM9GQrBmqs5Ke1CB91yHv8YTDpgA%3A1741012256668&ei=IL3FZ5uzKPOOnesPgfjaoQs&oq=navigator.clipboard.writetext%28text%29&gs_lp=Egxnd3Mtd2l6LXNlcnAiI25hdmlnYXRvci5jbGlwYm9hcmQud3JpdGV0ZXh0KHRleHQpKgIIBDIEEAAYRzIEEAAYRzIEEAAYRzIEEAAYRzIEEAAYRzIEEAAYRzIEEAAYRzIEEAAYR0j-A1AAWABwAHgCkAEAmAEAoAEAqgEAuAEByAEAmAIBoAJumAMAiAYBkAYIkgcDMC4xoAcA&sclient=gws-wiz-serp"
   
// }


// http://localhost/key123

// redirect(data[key123])