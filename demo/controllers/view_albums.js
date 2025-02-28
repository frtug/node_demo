
const Movie = require('../models/movies')

module.exports.view_home = (req,res)=>{
    //saving.....
    Movie.getAllMovie((movies)=>{
        res.render('home',{path:'/',page:'Home page',movies:movies})
    });    

}
// module.exports.movies = movies;