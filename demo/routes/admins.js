const express = require('express')
// const path = require('path')
// const rootDir = require('../utils/path')
const router = express.Router();

const album = require('../controllers/album')

router.get('/',album.view_home)
router.post('/add-movie',album.postMovie)
router.post('/edit-details/:id',album.getEditDetails)
router.get('/movie',album.getMoviePage)
router.post('/delete/:id',album.deleteMovie)
router.post('/update-movie',album.updateMovie)

module.exports = {
    router:router
}




