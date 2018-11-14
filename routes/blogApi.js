let express = require('express')
let action = require('../model/action')
let router = express.Router()

router.post('/commitBlog', action.commitBlog)

router.get('/getBlogsList', action.getBlogsList)

router.get('/getBlogById', action.getBlogDetail)

module.exports = router
