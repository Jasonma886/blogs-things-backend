let sql = require('../dao/commentsSql')
let connect = require('./connection')

function addComment (req, res) {
  let {from, to, content, blogId} = req.body
  connect.query(sql.addComment, [from, to, blogId, content], function (err, results) {
    if (err) throw err
    console.log(results)
    res.json({
      code: 0,
      message: 'Done!'
    })
  })
}

function getComments (req, res) {
  let {blogId} = req.query
  connect.query(sql.queryComments, [blogId], function (err, results) {
    if (err) throw err
    res.json({
      code: 0,
      data: results
    })
  })
}

module.exports = {
  addComment,
  getComments
}
