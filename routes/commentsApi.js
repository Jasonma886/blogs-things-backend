let express = require('express')
let action = require('../model/comments')
let router = express.Router()

router.post('/addComment', action.addComment)

module.exports = router
