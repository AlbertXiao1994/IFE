let express  = require('express')
let config = require('./config')
var proxyMiddleware = require('http-proxy-middleware')
var proxyTable = config.build.proxyTable

let port = process.env.PORT || config.build.port

let app = express()

let router = express.Router()

router.get('/',(req, res, next) => {
	req.url = '/index.html'
	next()
})

app.use(router)

var apiServer = express()
var bodyParser = require('body-parser')
apiServer.use(bodyParser.urlencoded({ extended: true }))
apiServer.use(bodyParser.json())
var apiRouter = express.Router()
var fs = require('fs')
apiRouter.route('/:apiName')
.all(function (req, res) {
  fs.readFile('./data.json', 'utf8', function (err, data) {
    if (err) throw err
    var data = JSON.parse(data)
    if (data[req.params.apiName]) {
      res.json(data[req.params.apiName])  
    }
    else {
      res.send('no such api name')
    }
  })
})

apiServer.use('/api', apiRouter);
apiServer.listen(port+1, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + (port + 1) + '\n')
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(context, options))
})

app.use(express.static('./dist'))
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Your application is running at http://localhost:' + port + '\n')
})