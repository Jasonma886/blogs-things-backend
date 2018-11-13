let express = require('express')
let bodyParser = require('body-parser')
let session = require('express-session')
let uuid = require('uuid/v4')
let app = express();
let action = require('./model/action')

app.use(session({
  name: 'donkey',
  genid: function () {
    return uuid()
  },
  secret: 'I have a little donkey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 15 }
}))

app.use(bodyParser.json())

app.get('/websites',action.getWebsites)

app.get('/userList', action.getUserList)

app.post('/commitBlog', action.commitBlog)

app.get('/getBlogsList', action.getBlogsList)

app.get('/getBlogById', action.getBlogDetail)

app.get('/login', action.login)

app.get('/checkLogin', action.checkLogin)

let server = app.listen(8081, function () {
  let host = server.address().address
  let port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
