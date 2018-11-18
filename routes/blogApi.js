let express = require('express')
let action = require('../model/blogsAction')
let router = express.Router()

router.post('/commitBlog', action.commitBlog)

router.post('/updateBlog', action.updateBlog)

router.get('/getBlogsList', action.getBlogsList)

router.get('/getCollections', action.getCollections)

router.get('/getBlogById', action.getBlogDetail)

router.post('/likedBlog', action.likedBlog)

router.delete('/dislikedBlog', action.dislikedBlog)

router.delete('/deleteBlog', action.deleteBlog)

module.exports = router
