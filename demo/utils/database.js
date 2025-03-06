const mongodb = require('mongodb')

const  mongoClient = mongodb.MongoClient;

let db;
// console.log(process.env.MONGO_URI)
const mongoConnect = cb =>{
  mongoClient.connect('mongodb+srv://abhi:qwerty123@short.qeqxj.mongodb.net/?retryWrites=true&w=majority&appName=short').then(
    client =>{
      db = client.db('urls');
      console.log('Mongodb is connected')
      cb();
    }).catch(err=>{
      console.log(err)
    })
}

const getDb = ()=>{
  if(db) return db;
  throw 'No database';
}
exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
