const fs = require('fs')

const getDb = require('../utils/database').getDb;

async function generate(){
    const { nanoid } = await import("nanoid");
    return nanoid(6);
};
module.exports = class Url{
    constructor(originalUrl){
            this.short_url = "";
            this.originalUrl = originalUrl
        }
        async save(){
            const db = getDb();

            this.short_url = await generate();
            const result = await db.collection('url').insertOne(this);
            console.log(result)
            return this.short_url
            
        }
        static async findByKey(key){
            const db= getDb();
            console.log(key)
            const result_doc = await db.collection('url').findOne({short_url:key})
            return result_doc ? result_doc.originalUrl : "https://google.com"; 
        }


        
        
}