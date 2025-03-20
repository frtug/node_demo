const express = require('express')

const router = express.Router();

const auth = require('../controllers/auth')

const {check,body} = require('express-validator')
const User = require('../models/user')

router.get('/auth/getlogin',auth.getLogin) // form login page
router.post('/auth/login',auth.login) // post login

router.get('/auth/getsignUp',auth.getsignUp) // form signUp page
router.post('/auth/signUp',[
    check('email').isEmail().withMessage("Email is not correct").custom((value,{req}) =>{
        return User.findOne({email:value}).then(userDoc=>{
            if(userDoc)
                return Promise.reject("email exist already")
            
        })
    }),
    body('password').isLength({min: 8}).withMessage("Password is not correct length").isAlphanumeric().trim()
],
    auth.signUp) // post signUp

router.get('/auth/logout',auth.logout) // post signUp

router.get('/auth/getreset',auth.getReset) // post signUp
router.post('/auth/reset',auth.reset) // post signUp
router.post('/auth/reset/complete',auth.reset_complete) // post signUp
router.get('/auth/reset/:token',auth.reset_password) // post signUp


module.exports = {
    router:router
}