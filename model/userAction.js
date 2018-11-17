let sql = require('../dao/userSql')
let connect = require('./connection')

function getUserList (req, res) {
  let {page, size} = req.query
  let offset = size * (page - 1)
  connect.query(sql.getList(offset, size), function (err, results) {
    if (err) reject(err)
    if (results[0] && results[1]) {
      res.json({
        data: results[0],
        total: results[1][0].total,
        code: 0
      })
    }
  })
}

function login (req, res) {
  let {userName, password} = req.query
  connect.query(sql.getUserByName, [userName], function (err, result) {
    if (err) throw err
    if (result[0]) {
      if (password === result[0].password) {
        req.session.login = true
        req.session.userName = userName
        res.json({
          code: 0,
          data: {
            lastLogin: result[0].last_login,
            loginTimes: result[0].login_times
          },
          message: 'login success!'
        })
        connect.query(sql.updateLoginTime, [userName])
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
        login: true,
        userName: req.session.userName
      }
    })
  } else {
    res.json({
      code: 1,
      message: 'no login'
    })
  }
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

module.exports = {
  getUserList,
  logout,
  login,
  checkLogin
}
