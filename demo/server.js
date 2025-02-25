// create a Nav bar,
// //  home, contact , login 
// basic home, create it
// contact is the existing form page
// login page 
// create error page with css


const express = require('express')
const adminRouter = require('./router/admins.js')
const path = require('path')
const rootDir = require('./utils/path.js')
const fs = require('fs')

// require is common js method

// import is es modules
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


app.set('view engine', 'pug')
app.set('views','views')
// app.use((req,res,next)=>{
//     console.log("i am express server")
//     // res.send('Hello World')
//     next()
// })
// app.use((req,res,next)=>{
//     console.log("i am server")
//     // res.send('Hello World')
//     next()
// })
const users = []; // in memory.

app.use('/admin',adminRouter.router)

app.post('/admin/add',(req,res)=>{
    console.log("Adding name in express")
    console.log(req.body)
    users.push(req.body.name);
    console.log(users)

    fs.writeFile('name.txt',req.body.name,(err)=>{
                    if(err) console.log("give the erro",err)
                    res.redirect('/')
    })
})
app.get('/',(req,res)=>{
    res.render('home',{path:'/',page:'Home page',users:users})
})

app.get('*',(req,res)=>{
    res.send("Error can't find any page")
})
app.post('*',(req,res)=>{
    res.json({message:"Error can't find the page",
        status:404
    })
})

app.listen(port,()=>{{
    console.log("server is runn,",port)
}})



// const server = createServer(serverHandler)

// server.listen(port,()=>{{
//     console.log("server is runn,",port)
// }})










// http
// https
// fs
// os
// path 

// express
// bodyParser
// cors
