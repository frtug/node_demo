//  user schema from models 
const User = require('../models/user')

module.exports.logout = (req,res)=>{
    req.session.destroy((err)=>{
        res.redirect("/admin")
    })
}
module.exports.getLogin = (req,res,next)=>{
    console.log("get login ")
    
    const isLoggedIn = req.session.isLoggedIn;
    res.render('login',{path:"/auth/login",page:"Login",isAuthenticated:isLoggedIn})
}
module.exports.login = (req,res)=>{
    console.log(" login ")
    // login....
    // const user = User({username:"frtug",password:"qwerty",movies:[]})
    // user.save().then(()=>{
    //     console.log("user saved")
    // })
    const {email,password} = req.body
    User.findOne({email}).then(user=>{
        
        if(user.password != password){
             throw new Error("user password dosen't match ")
        }
        req.session.user = user;
        req.session.isLoggedIn = true
        console.log("successful login")
        res.redirect('/admin')

    }).catch(err=>{
        console.log("error working on login")
    })
    // req.session.destory(); //logout from the session
}
module.exports.signUp = (req,res)=>{
    console.log(" signup ")
    const data = req.body;
    // login....
    console.log(data)
    const user = User({email:data.email,password:data.password,movies:[]})
    user.save().then(()=>{
        console.log("user saved")
    })
    
    
}
module.exports.getsignUp = (req,res)=>{
    console.log(" get Signup ")
    res.render('signUp',{path:"/auth/getsignUp",page:"SignUp",isAuthenticated:req.session.isLoggedIn})

}
    // req.session.destory(); //logout from the session


