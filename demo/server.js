const express = require('express')
var cors = require('cors')
const multer  = require('multer')
const path = require('path')
const adminRoute = require('./routes/admins.js')
const homeRoute = require('./routes/home.js')
const errors = require('./controllers/errors')

// const mongoConnect = require('./utils/database.js').mongoConnect;
const mongoose = require('mongoose');

const authRoute = require('./routes/auth')
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);


const app = express()
const port = 3000


const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null, new Date().toISOString()+'-'+file.originalname)
    }
})
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(multer({storage:fileStorage}).single('image'))

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
})
app.use(
    session({
        secret:'My Movie',
        resave:false,
        saveUninitialized:false,
        store:store,
        
    })
)

app.use(express.static('public'))
app.use('/images',express.static(path.join(__dirname,'images')))


app.set('view engine', 'ejs')
app.set('views','./views')

// app.use((req,res,next)=>{
//     req.user = "Abhishek"
//     next();
// })

app.use('/admin',adminRoute.router)
app.use(authRoute.router)
app.use(homeRoute.router)

app.use('*',errors.post_404)

app.use((error,req,res,next)=>{
    console.log("error",error)
    res.redirect('/auth/getsignUp')
    // Create a page 
})


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongo connect")
    app.listen(port,()=>{{
        console.log("server is runn,",port)
    }})
})


// fetch('http://localhost:3000/api/short',{method:POST})


// CREATE A QUIZ APP IN REACT JS. CHECK THE GROUP FORM JSON DATA
// {
//     "quizTitle": "General Knowledge Quiz",
//     "questions": [
//       {
//         "id": 1,
//         "question": "What is the capital of France?",
//         "options": [
//           { "id": 1, "text": "Berlin" },
//           { "id": 2, "text": "Madrid" },
//           { "id": 3, "text": "Paris", "isCorrect": true },
//           { "id": 4, "text": "Rome" }
//         ]
//       },
//       {
//         "id": 2,
//         "question": "Which planet is known as the Red Planet?",
//         "options": [
//           { "id": 1, "text": "Venus" },
//           { "id": 2, "text": "Mars", "isCorrect": true },
//           { "id": 3, "text": "Jupiter" },
//           { "id": 4, "text": "Saturn" }
//         ]
//       },
//       {
//         "id": 3,
//         "question": "What is the largest mammal in the world?",
//         "options": [
//           { "id": 1, "text": "Elephant" },
//           { "id": 2, "text": "Blue Whale", "isCorrect": true },
//           { "id": 3, "text": "Giraffe" },
//           { "id": 4, "text": "Polar Bear" }
//         ]
//       },
//       {
//         "id": 4,
//         "question": "Which language is used for web styling?",
//         "options": [
//           { "id": 1, "text": "HTML" },
//           { "id": 2, "text": "JavaScript" },
//           { "id": 3, "text": "Python" },
//           { "id": 4, "text": "CSS", "isCorrect": true }
//         ]
//       },
//       {
//         "id": 5,
//         "question": "Who painted the Mona Lisa?",
//         "options": [
//           { "id": 1, "text": "Vincent van Gogh" },
//           { "id": 2, "text": "Pablo Picasso" },
//           { "id": 3, "text": "Leonardo da Vinci", "isCorrect": true },
//           { "id": 4, "text": "Michelangelo" }
//         ]
//       }
//     ]
//   }{
//   "quizTitle": "General Knowledge Quiz",
//   "questions": [
//     {
//       "id": 1,
//       "question": "What is the capital of France?",
//       "options": [
//         { "id": 1, "text": "Berlin" },
//         { "id": 2, "text": "Madrid" },
//         { "id": 3, "text": "Paris", "isCorrect": true },
//         { "id": 4, "text": "Rome" }
//       ]
//     },
//     {
//       "id": 2,
//       "question": "Which planet is known as the Red Planet?",
//       "options": [
//         { "id": 1, "text": "Venus" },
//         { "id": 2, "text": "Mars", "isCorrect": true },
//         { "id": 3, "text": "Jupiter" },
//         { "id": 4, "text": "Saturn" }
//       ]
//     },
//     {
//       "id": 3,
//       "question": "What is the largest mammal in the world?",
//       "options": [
//         { "id": 1, "text": "Elephant" },
//         { "id": 2, "text": "Blue Whale", "isCorrect": true },
//         { "id": 3, "text": "Giraffe" },
//         { "id": 4, "text": "Polar Bear" }
//       ]
//     },
//     {
//       "id": 4,
//       "question": "Which language is used for web styling?",
//       "options": [
//         { "id": 1, "text": "HTML" },
//         { "id": 2, "text": "JavaScript" },
//         { "id": 3, "text": "Python" },
//         { "id": 4, "text": "CSS", "isCorrect": true }
//       ]
//     },
//     {
//       "id": 5,
//       "question": "Who painted the Mona Lisa?",
//       "options": [
//         { "id": 1, "text": "Vincent van Gogh" },
//         { "id": 2, "text": "Pablo Picasso" },
//         { "id": 3, "text": "Leonardo da Vinci", "isCorrect": true },
//         { "id": 4, "text": "Michelangelo" }
//       ]
//     }
//   ]
// }
