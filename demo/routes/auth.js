const express = require('express')

const router = express.Router();

const auth = require('../controllers/auth')


router.get('/auth/getlogin',auth.getLogin) // form login page
router.post('/auth/login',auth.login) // post login



module.exports = {
    router:router
}