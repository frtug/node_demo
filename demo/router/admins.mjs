import express from 'express'
import * as fs  from 'fs'
import * as path from 'path'
const adminRouter = express.Router();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

adminRouter.post('add',(req,res,next)=>{
    console.log("Adding name in express")
    // res.send('Hello World')
    // next()
    console.log(req.body)
    fs.writeFile('name.txt',req.body.name,err=>{
                res.redirect('/')
                })
})
adminRouter.get('/add',(req,res)=>{
    console.log("Adding name in express")
    // res.send('Hello World')
    // next()
    // res.status(201).send("we DOn't have get request here")
    res.header('Content-Type','application/json')
    res.send("sendin")
    // res.json({"message":"Not a valid url"})
})
adminRouter.use('/name',(req,res,next)=>{
    console.log("i am in name")
    // res.send('Hello World')
    // next()
    res.sendFile(path.join(__dirname,'../','views','form-user.html'))
})

export default adminRouter