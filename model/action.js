let connect = require('./sqlCon')
let session = require('express-session')

function getUserList (req, res) {
  let {size, page} = req.query
  connect.getUserList(size, page).then(results => {
    if (results[0] && results[1]) {
      res.json({
        data: results[0],
        total: results[1][0].total,
        code: 0
      })
    }
  })
}

function commitBlog (req, res) {
  if (req.session.login) {
    connect.commitBlog(req.body.params).then(results => {
      res.json({
        code: 0,
        message: 'commit success!'
      })
    })
  } else {
    res.json({
      code: 1,
      message: 'Please login first!'
    })
  }
}

function getBlogsList (req, res) {
  cover(req, res, function () {
    connect.getBlogsList().then(results => {
      res.json({
        code: 0,
        data: results
      })
    })
  })
}

function login (req, res) {
  let {userName, password} = req.query
  connect.login(userName).then(result => {
    if (result[0]) {
      if (password === result[0].password) {
        req.session.login = true
        res.json({
          code: 0,
          message: 'login success!'
        })
      } else {
        res.json({
          code: 1,
          message: 'login failed!'
        })
      }
    } else {
      res.json({
        code: 1,
        message: 'the user name is not existed!'
      })
    }
  })
}

function checkLogin (req, res) {
  if (req.session.login) {
    res.json({
      code: 0,
      data: {
        login: true
      }
    })
  } else {
    res.json({
      code: 1,
      message: 'no login'
    })
  }
}

function getBlogDetail (req, res) {
  cover(req, res, function () {
    connect.getBlogDetail(req.query.blogId).then(results => {
      res.json({
        code: 0,
        data: results[0]
      })
    })
  })
}

function logout (req, res) {
  if (req.session.login) {
    req.session.destroy(err => {
      res.json({
        code: 0,
        message: 'logout!'
      })
    })
  } else {
    res.json({
      code: 1,
      message: 'No login!'
    })
  }
}

function getWebsites (req, res) {
  console.log(req.session)
  cover(req, res, function () {
    connect.getWebsites().then(data => {
      res.send(data)
    })
  })
}

function cover (req, res, cb) {
  if (req.session.login) {
    cb()
  } else {
    res.send({
      code: 1,
      message: 'no login'
    })
  }
}

module.exports = {
  getUserList: getUserList,
  commitBlog: commitBlog,
  getBlogsList: getBlogsList,
  login: login,
  getBlogDetail: getBlogDetail,
  getWebsites: getWebsites,
  checkLogin: checkLogin,
  logout: logout
}
