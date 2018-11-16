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
  let user = req.session.userName
  if (!type || type === 'all') {
    type = '%'
  }
  connect.query(sql.getList1, [user, type], function (err, results) {
    if (err) throw err
    res.json({
      code: 0,
      data: results
    })
  })
}

function getCollections (req, res) {
  let type = req.query.type
  let user = req.session.userName
  if (!type || type === 'all') {
    type = '%'
  }
  connect.query(sql.getCollections, [type, user], function (err, results) {
    if (err) throw err
    res.json({
      code: 0,
      data: results
    })
  })
}

function getBlogDetail (req, res) {
  let user = req.session.userName
  connect.query(sql.getDetail, [user, req.query.blogId], function (err, results) {
    if (err) throw err
    connect.query(sql.updateClicked, [req.query.blogId])
    res.json({
      code: 0,
      data: results[0]
    })
  })
}

function likedBlog (req, res) {
  if (req.session.login) {
    let blogId = req.body.blogId
    let user = req.session.userName
    connect.query(sql.likedBlog, [blogId, user], function (err, results) {
      if (err) throw err
      res.json({
        code: 0,
        message: 'Have been collected!'
      })
    })
  } else {
    res.json({
      code: 1,
      message: 'No login!'
    })
  }
}

function dislikedBlog (req, res) {
  if (req.session.login) {
    let blogId = req.query.blogId
    let user = req.session.userName
    connect.query(sql.dislikedBlog, [blogId, user], function (err, results) {
      if (err) throw err
      res.json({
        code: 0,
        message: 'Have been cancelled!',
        data: results
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
  commitBlog,
  getBlogsList,
  getCollections,
  getBlogDetail,
  likedBlog,
  dislikedBlog
}
