let mysql = require('mysql')

let connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'runoob',
  multipleStatements: true
})

function getUserList (size = 10, page = 1) {
  let offset = size * (page - 1)
  return new Promise((resolve, reject) => {
    let sql = `select SQL_CALC_FOUND_ROWS user_name,user_age,date_format(create_date, '%Y-%m-%d %H:%i:%s') as createTime,date_format(last_login, '%Y-%m-%d %H:%i:%s') as last_login from user limit ${size} offset ${offset};SELECT FOUND_ROWS() as total;`
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
    let sql = 'INSERT INTO blog_tbl (title,author,content,about,origin) VALUES (?,?,?,?,?)'
    connect.query(sql, [title, author, content, about, origin], function (err, results) {
      if (err) reject(err)
      resolve(results)
    })
  })
}

function getBlogsList () {
  return new Promise((resolve, reject) => {
    let sql = 'select author, blog_id as blogId, title, about, date_format(commit_time, "%Y.%m.%d %H:%i:%s") as commitTime, left(content, 100) as content from blog_tbl limit 10 offset 0'
    connect.query(sql, function (err, results) {
      if (err) reject(err)
      resolve(results)
    })
  })
}

function getBlogDetail (id) {
  return new Promise((resolve, reject) => {
    let sql = 'select author, origin, blog_id as blogId, title, about, date_format(commit_time, "%Y.%m.%d %H:%i:%s") as commitTime, content from blog_tbl where blog_id=?'
    connect.query(sql, [id], function (err, results) {
      if (err) reject(err)
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
