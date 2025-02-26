const express = require('express')

const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/path')

const adminRouter = express.Router();

const users =  require('../server')

adminRouter.post('/add',(req,res)=>{
    console.log("Adding name in express")
        console.log(req.body)

    // console.log(users)

    // users.push(req.body.name);
    users.users.push(req.body.name)
    fs.writeFile('name.txt',req.body.name,(err)=>{
                    if(err) console.log("give the erro",err)
                    res.redirect('/')
    })
})
adminRouter.get('/name',(req,res,next)=>{
    console.log("i am in name")
    res.sendFile(path.join(rootDir,'views','form-user.html'))
})

module.exports = {
    router: adminRouter,
    name:'Abhishek'
}




// adminRouter.get('/add',(req,res)=>{
//     console.log("Adding name in express")
//     // res.send('Hello World')
//     // next()
//     // res.status(201).send("we DOn't have get request here")
//     res.header('Content-Type','application/json')
//     // res.send("sendin")
//     res.end(JSON.stringify({"message":"Not a url"})) // TODO:// Myself
// })