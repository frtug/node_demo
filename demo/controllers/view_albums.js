
const Movie = require('../models/movies')
const Url = require('../models/url')

module.exports.view_home = (req,res)=>{
    //saving.....
    Movie.getAllMovie((movies)=>{
        res.render('home',{path:'/',page:'Home page',movies:movies})
    });    

}

module.exports.url_shortner = (req,res)=>{
    // saving the origin url in the file
    const url = new Url(req.body.url)
    url.save(()=>{
        console.log("saved url " )
    })
    res.render('form-user',{path:'/admin/movies',page:'Movie page'})

}
module.exports.short = (req,res)=>{
    // redirect to the matched short key
    const short = req.params.short_url;
    Url.findByKey(short,(url)=>{
        res.redirect(url)
    })
}
// module.exports.movies = movies;