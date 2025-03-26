const express = require('express')

const app = express();

const port = process.env.PORT || 8080
app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the first endpoint!' });
  });
  

  app.get('/api/goodbye', (req, res) => {
    res.json({ message: 'Goodbye from the second endpoint!' });
  });
  
  app.get('/_ah/health', (req, res) => {
    res.status(200).send('ok');
  });

app.listen(port,()=>{
    console.log("server is connected")
})
