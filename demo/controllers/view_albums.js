
const Url = require('../models/url')



module.exports.url_shortner = (req,res)=>{
    // saving the origin url in the file
    // post req.
    const url = new Url(req.body.url)
    url.save().then((short)=>{
        // console.log(result)
        const local_url=`http://localhost:3000/short/${short}`
        res.render('form-user',{path:'/admin/movies',page:'url',local_url:local_url})
    })
}
module.exports.url_shortner_api = (req,res)=>{
    // saving the origin url in the file
    // post req.
    console.log("hello")
    console.log(req)
    const url = new Url(req.body.url) // mistake.....
    url.save().then((short)=>{
        // console.log(result)
        const local_url=`http://localhost:3000/short/${short}`
        res.status(201).json({short:local_url})
    })
}

// handle api's 
module.exports.short = (req,res)=>{
    // redirect to the matched short key
    const short = req.params.short_url;
    Url.findByKey(short).then((url)=>{
        res.status(301).redirect(url)
    })
    
}
// module.exports.movies = movies;


// creating a frontend of urls shortner in react...
