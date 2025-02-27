const Movie = require('../models/movies')
const fs = require('fs')

module.exports.addMovie = (req,res,next)=>{
    console.log("i am in name")
    // res.sendFile(path.join(rootDir,'views','form-user.html'))
    res.render('form-user',{})
}
module.exports.addingMovie = (req,res)=>{
    console.log("Adding name in express")
    // users.push(req.body.name);
    const movie1 = new Movie(req.body.name)
    movie1.save();
    res.redirect('/')

    // fs.writeFile('name.txt',req.body.name,(err)=>{
    //                 if(err) console.log("give the erro",err)
    // })
}