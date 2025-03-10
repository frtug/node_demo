const Movie = require('../models/movies')
const fs = require('fs')

module.exports.editDetails = async (req,res)=>{
    // console.log("i am in name")
    // res.json({"details":req.params.id})
    // TODO to add details page with single card
    const id = req.params.id; 
    const movie = await Movie.getAllMovie().then(movies =>{
        return movies.filter(movie => movie._id == id)
    }) 
    console.log(movie)
    res.render('editDetails',{page:'Edit Page',path:"/admin/edit-details",movie:movie[0]})
    
}

module.exports.addMovie = (req,res,next)=>{
    console.log("i am in name")
    // res.sendFile(path.join(rootDir,'views','form-user.html'))
    res.render('form-user',{page:"Form"})
}
module.exports.addingMovie = (req,res)=>{
    console.log("Adding name in express")
    // users.push(req.body.name);
    const movie = new Movie(req.body.title,"A daring crew embarks on an interstellar journey","Sci-Fi,Action,Comedy","4")
    movie.save().then(
        // console.log("saved")
        res.redirect('/')

    );

}
module.exports.deleteMovie = (req,res)=>{
    const id = req.params.id;
    Movie.deleteMovie(id).then(
        res.redirect('/')
    ); 
    
}
module.exports.updateDetails = (req,res)=>{
    const data = req.body;
    console.log("updated with the login")
    console.log(data)
    const movie = new Movie(data.title,data.desc,data.tags,data.rating,data.id)
    movie.update().then(()=>{
            res.redirect('/') 
        })
   
     
    
}
    // fs.writeFile('name.txt',req.body.name,(err)=>{
    //                 if(err) console.log("give the erro",err)
    // })


