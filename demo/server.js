const express = require('express')
var cors = require('cors')

const adminRoute = require('./routes/admins.js')
const homeRoute = require('./routes/home.js')
// const mongoConnect = require('./utils/database.js').mongoConnect;
const mongoose = require('mongoose');

const authRoute = require('./routes/auth')
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);


const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
})
app.use(
    session({secret:'My Movie',resave:false,saveUninitialized:false,store:store})
)
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views','./views')

// app.use((req,res,next)=>{
//     req.user = "Abhishek"
//     next();
// })

app.use('/admin',adminRoute.router)
app.use(authRoute.router)
app.use(homeRoute.router)




mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongo connect")
    app.listen(port,()=>{{
        console.log("server is runn,",port)
    }})
})


// fetch('http://localhost:3000/api/short',{method:POST})



