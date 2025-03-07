const express = require('express')
var cors = require('cors')

const adminRoute = require('./routes/admins.js')
const homeRoute = require('./routes/home.js')
const mongoConnect = require('./utils/database.js').mongoConnect;


// type Param = Object;

// function helloObject(obj: Param){
//     return obj;
// }
// helloObject()

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views','./views')

app.use('/admin',adminRoute.router)
app.use('/',homeRoute.router)

mongoConnect(()=>{
    app.listen(port,()=>{{
        console.log("server is runn,",port)
    }})
})


// fetch('http://localhost:3000/api/short',{method:POST})



