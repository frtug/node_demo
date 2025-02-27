module.exports.post_404 = (req,res)=>{
    res.status(404).json({message:"Error can't find the page"})
}

module.exports.get_404 = (req,res)=>{
    res.render('error',{path:req.url,page:"Error 404"})
}
