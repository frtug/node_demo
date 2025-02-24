// const http = require('http')
const express = require('express')

const adminRouter = require('./router/admins.js')

// require is common js method

// import is es modules
const app = express()
const port = 3000
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

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

app.use(adminRouter.router)

console.log(adminRouter.name)


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
