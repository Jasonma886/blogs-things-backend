let uuid = require('uuid/v4')

// MySQL数据库联接配置
module.exports = {
  mysql: {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database:'runoob',
    port: 3306,
    multipleStatements: true
  },
  session: {
    name: 'donkey',
    genid: function () {
      return uuid()
    },
    secret: 'I have a little donkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 15 }
  }
}
