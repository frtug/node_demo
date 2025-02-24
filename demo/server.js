// create a Nav bar,
// //  home, contact , login 
// basic home, create it
// contact is the existing form page
// login page 
// create error page with css


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

app.use('/admin',adminRouter.router)


// console.log(adminRouter.name)


app.get('/',(req,res)=>{
    res.send(" Hello Welcome to your Node js Page")
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
