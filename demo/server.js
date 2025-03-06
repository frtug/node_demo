const express = require('express')
const adminRoute = require('./routes/admins.js')
const homeRoute = require('./routes/home.js')
const mongoConnect = require('./utils/database.js').mongoConnect;
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
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



