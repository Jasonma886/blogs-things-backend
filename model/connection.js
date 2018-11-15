let mysql = require('mysql')
let conf = require('../conf/db')

module.exports = mysql.createConnection(conf.mysql)
