//  user schema from models 
const User = require('../models/user')
const bcrypt = require('bcrypt');
const randomtoken = require('../utils/random-token')
const {validationResult} = require('express-validator')

require('dotenv').config()

module.exports.logout = (req,res)=>{
    req.session.destroy((err)=>{
        res.redirect("/auth/getlogin")
    })
}
module.exports.getLogin = (req,res,next)=>{
    console.log("get login ")
    
    const isLoggedIn = req.session.isLoggedIn;
    res.render('login',{path:"/auth/login",page:"Login",isAuthenticated:isLoggedIn})
}
module.exports.login = (req,res)=>{
    console.log(" login ")
   
    const {email,password} = req.body
    User.findOne({email}).then(user=>{
        if(!user){
            return res.redirect('/auth/getlogin')
        }
        bcrypt.compare(password,user.password).then(isMatched=>{
            if(isMatched){
                req.session.user = user;
                req.session.isLoggedIn = true
                console.log("successful login")
                return req.session.save(err=>{
                    res.redirect('/admin')
                })
            }
            res.redirect('/auth/getlogin')
        })
    }).catch(err=>{
        console.log("error working on login")
    })
    // req.session.destory(); //logout from the session
}
module.exports.signUp = async(req,res,next)=>{
    console.log(" signup ")
    const {email,password} = req.body;
    // TODO add the js to do validation....
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).render('signUp',{
            path:"/auth/getsignUp",
            page:"SignUp",
            isAuthenticated:req.session.isLoggedIn,
            errorMessage:errors.array()[0].msg
        })
    }
    // login....
    const { Resend } = await import('resend');

    const resend = new Resend(process.env.EMAIL_KEY);
    
     bcrypt.hash(password,12).then((hash_pass)=>{
            const user = new User({email:email,password:hash_pass,movies:[]})
            return user.save();
        }).then(result=>{
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Account creation on Movie',
            html: '<p>Welcome you have created your Account is Movie platform  <strong>First Account</strong>!</p>'
          });
        res.redirect('/auth/getlogin')
    }).catch(err=>{
        // the way to make error handle properly with 
        // Express middleware....
        console.log("error on the catch")
        const error = new Error(err);
        error.httpStatusCode = 500;
        error.msg = "Unable to handle the require"
        return next(error)
    })
}
module.exports.getsignUp = (req,res)=>{
    console.log(" get Signup ")
    res.render
    ('signUp',{path:"/auth/getsignUp",
        page:"SignUp",
        isAuthenticated:req.session.isLoggedIn,
        errorMessage:""})
}

module.exports.getReset = (req,res)=>{
    res.render("reset/reset-email",{page:"Generate Reset",path:"/auth/getreset"})
}
module.exports.reset = async(req,res)=>{
    // it will get the email from the form 
    const {email} = req.body;

    const { Resend } = await import('resend');

    const resend = new Resend(process.env.EMAIL_KEY);

    User.findOne({email:email}).then(user=>{
        if(!user){
            return res.redirect('/auth/getreset')
        }
        console.log("user found")
    // logic for email sending and token creation
        // user.token = await randomtoken(10);
        return randomtoken(10).then(token=> {
            user.resetToken = token;
            user.resetTokenExpiration = Date.now()+3600000
            return user.save();
            
        }).then((result)=>{
            resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Password reset Request',
                html: `<p>Your password is reset, Change into new one <a href="http://localhost:3000/auth/reset/${user.resetToken}">Click to reset</a>  <strong>First Account</strong>!</p>`
              });
              return res.render("reset/reset-info",{page:"Reset Info",path:"/auth/reset"})

        }).catch(err=>{
            console.log("err",err)
        })
    }).catch(err=>{
        console.log("error occoured",err)
        res.redirect('/auth/getlogin')
    })
}
module.exports.reset_password = (req,res)=>{
    // logic for email sending and token creation
    const token = req.params.token;
    console.log(token)
    User.findOne({resetToken:token,resetTokenExpiration: { $gt: Date.now()} }).then(user=>{
        console.log(user)
       res.render("reset/reset-password",{page:"Reset Password",path:"/auth/reset/token",token:token,userId:user._id})
    })
}
module.exports.reset_complete = (req,res)=>{
    // logic for email sending and token creation
    const {token,password,userId} = req.body;
    console.log(token,password,userId)
    let resetUser;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
        res.render("reset/reset-complete",{page:"Reset Complete",path:"/auth/reset/complete"})
    })
    .catch(err => {
      console.log(err);
    });
}
    // req.session.destory(); //logout from the session


