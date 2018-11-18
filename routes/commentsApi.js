let express = require('express')
let action = require('../model/comments')
let router = express.Router()

router.post('/addComment', action.addComment)
router.get('/getComments', action.getComments)
router.get('/getCommentsByUser', action.getCommentsByUser)

module.exports = router
