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
const engine = require('express-handlebars')

// require is common js method

// import is es modules
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.engine('handlebars',engine.engine())

app.set('view engine', 'handlebars')
app.set('views','./views')
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
const movies = []; // in memory.

app.use('/admin',adminRouter.router)


app.get('/',(req,res)=>{
    res.render('home',{path:'/',page:'Home page',movies:movies})
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

module.exports.movies = movies;

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
