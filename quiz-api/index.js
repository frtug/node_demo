const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const  socketIo  = require("socket.io");

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken')

const app = express();
const server = createServer(app);

const io = socketIo(server,{
  cors:{
    origin:'http://localhost:5173', // react frontend
    methods:['GET',"POST"]
  }
});
// TODO to handle cors

const PORT = 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Load questions from JSON file
const questionsPath = path.join(__dirname, 'data', 'questions.json');
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));

// Load questions from JSON file

const ansPath = path.join(__dirname, 'data', 'answers.json');
const answers = JSON.parse(fs.readFileSync(ansPath, 'utf-8'));

let token = ""

function verifyToken(req,res,next){
  const auth = req.headers['authorization'];
  console.log(auth)
  const token = auth && auth.split(" ")[1];
  
  console.log(token)
  let isError = false;
  try{
    jwt.verify(token,"My Key",(err,decoded)=>{
      if(err){
        throw err('Failed verification')
      }
      console.log("Value is correct",decoded)
    })
  }
  catch(err){
    return res.status(400).json({"msg":"Verification Failed"})
  }
  next()
}





app.get("/",(req,res,next)=>{
  console.log("Socket io is connected")
  next();
})
// API endpoint to get a specific question
app.get('/api',(req,res)=>{
    const totalQuestion = questions.length;
    console.log(totalQuestion)
    res.status(200).json({totalQuestion:totalQuestion})
})
app.get('/api/questions/:id', (req, res) => {
  
  const questionId = parseInt(req.params.id);
  const question = questions.find(q => q.id === questionId);
  
  if (question) {
    res.status(200).json(question);
  } else {
    res.status(404).json({ message: 'Question not found' });
  }
});

// API endpoint to verify answer
app.post('/api/verify-answer',verifyToken, (req, res) => {
  const { questionId, selectedOption } = req.body;
  console.log(questionId,selectedOption)
  const q = questions.find(q => q.id === questionId);

  if (!q) {
    return res.status(404).json({ message: 'Question not found' });
  }
    const a = answers.find(a => a.id === q.id);

  const isCorrect = selectedOption === a.correctAnswer;
  res.json({ isCorrect:isCorrect, correctAnswer: a.correctAnswer });
});

app.post('/api/auth/login',(req,res)=>{
    const {email,password} = req.body;
    console.log(req.body)
    
    res.status(200).json({message:"success",token:token})
})
app.post('/api/auth/signup',(req,res)=>{
    const {name,email,password,confirmPassword} = req.body;
    console.log(req.body)
    const access_token = jwt.sign({
        email:email
    },"My Key",{expiresIn:'7d'})
    token = access_token
    res.status(200).json({message:"success",token:token})
})


io.on('connection',(socket)=>{
  console.log("User connected",socket.id);

  socket.on('message',(data)=>{
    // saving to db or something we need
    console.log(data)
    io.emit('message',data)

  })

  socket.on('disconnect',()=>{console.log("disconnected",socket.id)});
})

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});