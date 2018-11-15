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

module.exports = {
  addComment
}
