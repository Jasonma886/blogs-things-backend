let sql = require('../dao/blogSql')
let connect = require('./connection')

function commitBlog (req, res) {
  if (req.session.login) {
    let {author, content, title, origin, about} = req.body
    connect.query(sql.insert, [title, author, content, about, origin], function (err, results) {
      if (err) throw err
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
  let type = req.query.type
  if (!type || type === 'all') {
    type = '%'
  }
  connect.query(sql.getList, [type], function (err, results) {
    if (err) throw err
    res.json({
      code: 0,
      data: results
    })
  })
}

function getBlogDetail (req, res) {
  connect.query(sql.getDetail, [req.query.blogId], function (err, results) {
    if (err) throw err
    res.json({
      code: 0,
      data: results[0]
    })
  })
}

module.exports = {
  commitBlog,
  getBlogsList,
  getBlogDetail
}
