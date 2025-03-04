const Movie = require('../models/movies')
const fs = require('fs')

module.exports.getDetail = (req,res)=>{
    console.log("i am in name")
    res.json({"details":req.params.id})
    // TODO to add details page with single card 
    res.render('cardDetail',{})
}

module.exports.addMovie = (req,res,next)=>{
    console.log("i am in name")
    // res.sendFile(path.join(rootDir,'views','form-user.html'))
    res.render('form-user',{page:"Form"})
}
module.exports.addingMovie = (req,res)=>{
    console.log("Adding name in express")
    // users.push(req.body.name);
    const movie1 = new Movie(req.body.title,"A daring crew embarks on an interstellar journey","Sci-Fi","4")
    movie1.save(()=>{
        // adding a callback to handle async operation
        res.redirect('/')
    });
    
}
module.exports.deleteMovie = (req,res)=>{
    const id = req.params.id;
    Movie.deleteMovie(id,()=>{
        res.redirect('/')
    }); 
    
}
    // fs.writeFile('name.txt',req.body.name,(err)=>{
    //                 if(err) console.log("give the erro",err)
    // })


