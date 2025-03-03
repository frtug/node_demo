const express = require('express')
// const path = require('path')
// const rootDir = require('../utils/path')
const router = express.Router();

const album = require('../controllers/album')

router.post('/add-movie',album.addingMovie)
router.get('/get-detail/:id',album.getDetail)
router.get('/movie',album.addMovie)
router.post('/delete/:id',album.deleteMovie)

// router.post("/shorten-url",(req,res)=>{
//     const {inputUrl} = req.body;
//     // validation 
//     const short_slug = nanoid();

//     saveToFile(short_slug,inputUrl) // create a function

//     short_urls[short_slug] = inputUrl;
//     res.json({shortUrl:`http://localhost:3000/${shortUrl}`})
// })
// // redirects to the actual url 
// router.get('/:shortid',(req,res)=>{
//     // retreive from the json fil
//      const short = fs.readFileSync()
//      // req.parms vs req.query
//     const originalUrl =  short[req.params.shortid];
//     res.redirect(originalUrl)
// })


module.exports = {
    router:router
}