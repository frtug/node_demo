// const http = require('http')
import {createServer} from 'http' 
import express from 'express'

import {serverHandler} from './routes.mjs'

import adminRouter from './router/admins.mjs'

// require is common js method

// import is es modules
const app = express()
const port = 3000
app.use(express.urlencoded({extended:true}))


app.use((req,res,next)=>{
    console.log("i am express server")
    // res.send('Hello World')
    next()
})
app.use((req,res,next)=>{
    console.log("i am server")
    // res.send('Hello World')
    next()
})

app.use(adminRouter)



app.use('/',(req,res)=>{
    res.send(" Hello Welcome to your Node js Page")
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
