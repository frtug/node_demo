const Movie = require('../models/movie')
const User = require('../models/user')

module.exports.view_home = (req,res)=>{
    //saving.....
    console.log(req.user)
    let isLoggedIn = req.session.isLoggedIn 
    console.log(isLoggedIn)
    console.log(req.session.user)
    if(req.session.user){
        Movie.find({userId:req.session.user._id}).then((m)=> {
                console.log("working")
                console.log(m)
                // let movies = m;
                // if(!m.length){
                //     movies = []
                // }
                res.render('home',{path:'/',page:'Home',movies:m,isAuthenticated:isLoggedIn})

            }); 
    }
    else{
        res.render('home',{path:'/',page:'Home',movies:[],isAuthenticated:isLoggedIn})
    }
       
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

module.exports.postMovie = async (req, res) => {
    console.log("Adding name in express");
    const user = req.session.user; 
    const movie = new Movie({
        title: req.body.title,
        desc: "A daring crew embarks on an interstellar journey",
        tags: "Sci-Fi,Action,Comedy",
        rating: 4,
        userId:user._id
    });

    try {
        const savedMovie = await movie.save();
        const user = await User.findById(req.session.user._id); // Assuming you store user ID in session
        await user.addMovie(savedMovie);
        req.session.user=user;
        console.log("Movie saved and user updated");
        res.redirect('/admin');
    } catch (error) {
        console.error("Error adding movie:", error);
        res.status(500).send("Error adding movie");
    }
};
module.exports.deleteMovie = async (req, res) => {
    const id = req.params.id;

    try {
        const movie = await Movie.findByIdAndDelete(id);
        const user = await User.findById(req.session.user._id); // Assuming you store user ID in session
        await user.deleteMovie(id);
        req.session.user=user;

        console.log("Movie deleted and user updated");
        res.redirect('/admin');
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).send("Error deleting movie");
    }
};
module.exports.updateMovie = async (req, res) => {
    const data = req.body;
    const user = req.session.id
    try {
        const movie = await Movie.findById(data.id);
        if (!movie) {
            return res.status(404).send("Movie not found");
        }

        movie.title = data.title;
        movie.desc = data.desc;
        movie.tags = data.tags;
        movie.rating = data.rating;
        movie.userId = user._id

        await movie.save();

        const user = await User.findById(req.session.user._id); // Assuming you store user ID in session
        await user.updateMovie(movie);
        req.session.user=user;

        console.log("Movie updated and user updated");
        res.redirect('/admin');
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).send("Error updating movie");
    }
};
 

