const express = require('express')

const router = express.Router();

const errors = require('../controllers/errors')
const view_albums = require('../controllers/view_albums')

router.get('/',view_albums.view_home)
router.post('*',errors.post_404)
// router.get('*',errors.get_404)



module.exports = {
    router:router
}

// module.exports.router = router;
// module.exports.movies = movies;