let express = require('express')
let action = require('../model/action')
let router = express.Router()

router.get('/userList', action.getUserList)

router.get('/login', action.login)

router.get('/logout', action.logout)

router.get('/checkLogin', action.checkLogin)

module.exports = router
