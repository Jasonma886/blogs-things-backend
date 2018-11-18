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

function getCommentsByUser (req, res) {
  if (req.session.login) {
    let user = req.session.userName
    connect.query(sql.queryCommentsByUser, [user], function (err, results) {
      if (err) throw err
      res.json({
        code: 0,
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

let deleteComment = (req ,res) => {
  if (req.session.login) {
    let user = req.session.userName
    let commentId = req.query.commentId
    connect.query(sql.getCommentById, [commentId], function (err, result) {
      if (err) throw err
      if (result.length > 0) {
        if (result[0].user === user) {
          connect.query(sql.deleteComment, [commentId], function (err, result) {
            if (err) throw err
            res.json({
              code: 0,
              message: 'Comment have been deleted!'
            })
          })
        } else {
          res.json({
            code: 1,
            message: 'No permission!'
          })
        }
      }
    })
  } else {
    res.json({
      code: 1,
      message: 'No login!'
    })
  }
}

function likedComments (req, res) {
  let {blogId} = req.query
}

module.exports = {
  addComment,
  getComments,
  getCommentsByUser,
  deleteComment
}
