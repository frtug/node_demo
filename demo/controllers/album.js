const Movie = require('../models/movies')

module.exports.editDetails = (req,res)=>{
    // console.log("i am in name")
    // res.json({"details":req.params.id})
    // TODO to add details page with single card
    const id = req.params.id; 
    Movie.findById(id).then(movie =>{
        if(!movie) return res.redirect('/')
        res.render('editDetails',{page:'Edit Page',path:"/admin/edit-details",movie:movie})
    }) 
    
    
}

module.exports.addMovie = (req,res,next)=>{
    console.log("i am in name")
    // res.sendFile(path.join(rootDir,'views','form-user.html'))
    res.render('form-user',{page:"Form"})
}
module.exports.addingMovie = (req,res)=>{
    console.log("Adding name in express")
    // users.push(req.body.name);
    const movie = new Movie({title:req.body.title,desc:"A daring crew embarks on an interstellar journey",tags:"Sci-Fi,Action,Comedy",rating:4})
    movie.save().then(()=>{
        console.log("saved")
        res.redirect('/')
        }
    );
}
module.exports.deleteMovie = (req,res)=>{
    const id = req.params.id;
    Movie.findByIdAndDelete(id).then(()=>{
        console.log("deleted")
        res.redirect('/')
    }
    ); 
    
}
module.exports.updateDetails = (req,res)=>{
    const data = req.body;
    console.log("updated with the login")
    console.log(data)
    // const movie = new Movie(data.title,data.desc,data.tags,data.rating,data.id)

    Movie.findById(data.id).then((movie)=>{
            movie.title = data.title;
            movie.desc = data.desc;
            // TODO add other fields 
            return movie.save()
        }).then(result =>{
            console.log("updated")
            res.redirect('/')
        })
   
     
    
}
    // fs.writeFile('name.txt',req.body.name,(err)=>{
    //                 if(err) console.log("give the erro",err)
    // })


