const express = require('express')
// const path = require('path')
// const rootDir = require('../utils/path')
const router = express.Router();
const auth = require('../middleware/is-auth')
const album = require('../controllers/album')

router.get('/',album.view_home)
router.post('/add-movie',auth,album.postMovie)
router.post('/edit-details/:id',auth,album.getEditDetails)
router.get('/movie',auth,album.getMoviePage)
router.post('/delete/:id',auth,album.deleteMovie)
router.post('/update-movie',auth,album.updateMovie)

module.exports = {
    router:router
}




