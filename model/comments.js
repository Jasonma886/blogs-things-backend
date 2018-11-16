let sql = require('../dao/commentsSql')
let connect = require('./connection')

function addComment (req, res) {
  if (req.session.login) {
    let {to, content, blogId} = req.body
    let from = req.session.userName
    connect.query(sql.addComment, [from, to, blogId, content], function (err, results) {
      if (err) throw err
      console.log(results)
      res.json({
        code: 0,
        message: 'Done!'
      })
    })
  } else {
    res.json({
      code: 1,
      message: 'No login!'
    })
  }
}

function getComments (req, res) {
  let {blogId} = req.query
  connect.query(sql.queryComments, [blogId, blogId], function (err, results) {
    if (err) throw err
    res.json({
      code: 0,
      data: results[0],
      total: results[1][0].total
    })
  })
}

function likedComments (req, res) {
  let {blogId} = req.query
}

module.exports = {
  addComment,
  getComments
}
