const express = require('express')
const app = express()
const port = Number(process.env.TOURNAPRO_PORT || 3000)
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const verifyAuth = require('./src/middleware/verify-auth')

function startServer() {
  console.log('Connecting to mongd db...')
  const url = process.env.TOURNAPRO_MONGO_URL || 'mongodb://192.168.99.100/TournaProDB'
  mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  console.log('Connected!')

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  
  app.use(verifyAuth)

  require('./src/routes')(app)

  app.use(function(req, res) {
    res.status(404).send({error: `${req.originalUrl} not found`})
  })

  app.listen(port, function() {
    console.log(`TournaPro API server started on port ${port}!`)
  })
}

const waitTime = Number(process.env.TOURNAPRO_CONNECTION_DELAY || 0)
setTimeout(startServer, waitTime)
