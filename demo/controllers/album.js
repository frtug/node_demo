const Movie = require('../models/movies')

module.exports.view_home = (req,res)=>{
    //saving.....
    console.log(req.user)
    let isLoggedIn = req.session.isLoggedIn
    console.log(isLoggedIn)
    Movie.find().then((movies)=> {
        res.render('home',{path:'/',page:'Home page',movies:movies,isAuthenticated:isLoggedIn})
    });    
}
module.exports.getEditDetails = (req,res)=>{

    const id = req.params.id; 
    Movie.findById(id).then(movie =>{
        if(!movie) return res.redirect('/admin')
        res.render('editDetails',{page:'Edit Page',path:"/admin/edit-details",movie:movie})
    }) 
}

module.exports.getMoviePage = (req,res,next)=>{
    console.log("i am in name")
    // res.sendFile(path.join(rootDir,'views','form-user.html'))
    res.render('form-user',{page:"Form",isAuthenticated:req.session.isLoggedIn})
}

module.exports.postMovie = (req,res)=>{
    console.log("Adding name in express")
    // users.push(req.body.name);
    const movie = new Movie({title:req.body.title,desc:"A daring crew embarks on an interstellar journey",tags:"Sci-Fi,Action,Comedy",rating:4})
    movie.save().then(()=>{
        console.log("saved")
        res.redirect('/admin')
        }
    );
}
module.exports.deleteMovie = (req,res)=>{
    const id = req.params.id;
    Movie.findByIdAndDelete(id).then(()=>{
        console.log("deleted")
        res.redirect('/admin')
    }
    ); 
    
}
module.exports.updateMovie = (req,res)=>{
    const data = req.body;
    console.log("updated with the login")
    console.log(data)

    Movie.findById(data.id).then((movie)=>{
            movie.title = data.title;
            movie.desc = data.desc;
            movie.tags = data.tags;
            movie.rating = data.rating
            movie._id = data.id
            // TODO add other fields 
            return movie.save()
        }).then(result =>{
            console.log("updated")
            res.redirect('/admin')
        })
}
 

