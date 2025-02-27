const express = require('express')
// const path = require('path')
// const rootDir = require('../utils/path')
const router = express.Router();

const album = require('../controllers/album')

router.post('/add-movie',album.addingMovie)
router.get('/movie',album.addMovie)

module.exports = {
    router:router
}