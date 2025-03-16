const express = require('express')

const router = express.Router();

const auth = require('../controllers/auth')


router.get('/auth/getlogin',auth.getLogin) // form login page
router.post('/auth/login',auth.login) // post login

router.get('/auth/getsignUp',auth.getsignUp) // form signUp page
router.post('/auth/signUp',auth.signUp) // post signUp

router.get('/auth/logout',auth.logout) // post signUp



module.exports = {
    router:router
}