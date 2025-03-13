//  user schema from models 

module.exports.getLogin = (req,res,next)=>{
    console.log("get login ")
    
    console.log(req.session.isLoggedIn)
    const isLoggedIn = req.session.isLoggedIn;
    res.render('login',{path:"/auth/login",page:"Login",isAuthenticated:isLoggedIn})
}
module.exports.login = (req,res)=>{
    console.log(" login ")
    // login....
    req.session.isLoggedIn = true
    // req.session.destory(); //logout from the session
    res.redirect('/admin')
}
