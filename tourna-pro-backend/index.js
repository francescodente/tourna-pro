const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const verifyAuth = require('./src/middleware/verify-auth')
const { notFound } = require('./src/utils/action-results')
const port = Number(process.env.TOURNAPRO_PORT || 3000)
const notificationsService = require('./src/services/notifications-service')

async function startServer() {
  console.log('Connecting to mongd db...')
  const url = process.env.TOURNAPRO_MONGO_URL || 'mongodb://192.168.99.100/TournaProDB'
  await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  console.log('Connected!')
  
  const app = express()
  const server = require('http').createServer(app)
  console.log(process.env.TOURNAPRO_FRONTEND_ORIGIN)
  const io = require('socket.io')(server, {
    cors: {
      origin: process.env.TOURNAPRO_FRONTEND_ORIGIN || 'http://localhost:8080',
      methods: ['GET', 'POST']
    }
  })
  io.on('connection', function (socket) {
    console.log('New connection available')
    notificationsService.onConnection(socket)
  })
  notificationsService.onStartup()
  

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(cors())

  app.use(function(_, res, next) {
    res.setResult = function(result) {
      result(this)
    }
    next()
  })
  
  app.use(verifyAuth)

  require('./src/routes')(app)

  app.use(function(req, res) {
    res.setResult(notFound(`${req.originalUrl} not found`))
  })

  server.listen(port, function() {
    console.log(`TournaPro API server started on port ${port}!`)
  })
}

const waitTime = Number(process.env.TOURNAPRO_CONNECTION_DELAY || 0)
setTimeout(startServer, waitTime)
