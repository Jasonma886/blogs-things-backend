let connect = require('./connection')

function getWebsites (req, res) {
  let sql = 'select * from websites'
  connect.query(sql, function (err, results) {
    res.send(results)
  })
}

module.exports = {
  getWebsites
}
