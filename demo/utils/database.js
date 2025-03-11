require('dotenv').config()
const mongodb = require('mongodb')

const  mongoClient = mongodb.MongoClient;

let db;
// console.log(process.env.MONGO_URI)
const mongoConnect = cb =>{
  mongoClient.connect(process.env.MONGO_URI).then(
    client =>{
      db = client.db(process.env.DB);
      console.log('Mongodb is connected')
      cb();
    }).catch(err=>{
      console.log("error at databse ")
      console.log(err)
    })
}

const getDb = ()=>{
  if(db) return db;
  throw 'No database';
}
exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
