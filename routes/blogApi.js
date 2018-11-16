let express = require('express')
let action = require('../model/blogsAction')
let router = express.Router()

router.post('/commitBlog', action.commitBlog)

router.get('/getBlogsList', action.getBlogsList)

router.get('/getBlogById', action.getBlogDetail)

router.post('/likedBlog', action.likedBlog)

router.delete('/dislikedBlog', action.dislikedBlog)

module.exports = router
