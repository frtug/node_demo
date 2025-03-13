const express = require('express')

const router = express.Router();

const errors = require('../controllers/errors')
const view_albums = require('../controllers/view_albums')

router.post('/url-short',view_albums.url_shortner)

// apis for the react frontent 
router.post('/api/url-short',view_albums.url_shortner_api)

router.get('/short/:short_url',view_albums.short)




router.post('*',errors.post_404)
// router.get('*',errors.get_404)



module.exports = {
    router:router
}

// module.exports.router = router;
// module.exports.movies = movies;