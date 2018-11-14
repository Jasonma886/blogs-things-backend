let mysql = require('mysql')
let conf = require('../conf/db')
let blogSql = require('../dao/blogSql')
let userSql = require('../dao/userSql')

let connect = mysql.createConnection(conf.mysql)

function getUserList (size = 10, page = 1) {
  let offset = size * (page - 1)
  return new Promise((resolve, reject) => {
    let sql = userSql.getList(offset, size)
    connect.query(sql, function (err, results) {
      if (err) reject(err)
      resolve(results)
    })
  })
}

function login (userName = '') {
  return new Promise((resolve, reject) => {
    let sql = 'select user_name, user_password as password from user where user_name=?'
    connect.query(sql, [userName], function (err, results) {
      if (err) reject(err)
      resolve(results)
    })
  })
}

function getWebsites () {
  return new Promise((resolve, reject) => {
    let sql = 'select * from websites'
    connect.query(sql, function (err, results) {
      if (err) reject(err)
      resolve(results)
    })
  })
}

function commitBlog (params) {
  let {author, content, title, origin, about} = params
  return new Promise((resolve, reject) => {
    let sql = blogSql.insert
    connect.query(sql, [title, author, content, about, origin], function (err, results) {
      if (err) reject(err)
      resolve(results)
    })
  })
}

function getBlogsList () {
  return new Promise((resolve, reject) => {
    let sql = blogSql.getList
    connect.query(sql, function (err, results) {
      if (err) reject(err)
      resolve(results)
    })
  })
}

function getBlogDetail (id) {
  return new Promise((resolve, reject) => {
    let sql = blogSql.getDetail
    connect.query(sql, [id], function (err, results) {
      if (err) reject(err)
      let update = blogSql.updateClicked
      connect.query(update, [id], function (err, results) {
        if (err) throw err
        console.log(results)
      })
      resolve(results)
    })
  })
}

function close () {
  connect.end()
}

function link () {
  connect.connect()
}

module.exports = {
  getUserList: getUserList,
  login: login,
  close: close,
  getWebsites: getWebsites,
  connect: link,
  commitBlog: commitBlog,
  getBlogsList: getBlogsList,
  getBlogDetail: getBlogDetail
}
