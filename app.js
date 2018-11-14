let express = require('express')
let http = require('http')
let bodyParser = require('body-parser')
let session = require('express-session')
let conf = require('./conf/db')
let app = express();
let action = require('./model/action')
let userRouter = require('./routes/userApi')
let blogRouter = require('./routes/blogApi')

app.use(session(conf.session))

app.set("view engine", "ejs")
app.use(bodyParser.json())

app.get('/websites',action.getWebsites)

app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.set('port', 8081)
let server = http.createServer(app)
server.listen(8081)
server.on('listening', () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
})
