
const Movie = require('../models/movies')
const movies = Movie.getAllMovie();    

module.exports.view_home = (req,res)=>{
    //saving.....

    res.render('home',{path:'/',page:'Home page',movies:movies})
}
// module.exports.movies = movies;