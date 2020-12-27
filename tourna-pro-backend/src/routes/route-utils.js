const { notImplemented } = require("../utils/action-results")

const useMock = false

function printSeparator() {
  console.log("===========================================================================================")
}

function encodePrettily(obj) {
  return JSON.stringify(obj, null, 2)
} 

exports.mapControllerRoutes = function(controllerName, mapper) {
  const controllersFolder = useMock ? 'mock-controllers' : 'controllers'
  const controller = require(`../${controllersFolder}/${controllerName}`)
  return app => mapper(app, controller)
}

exports.action = function(f) {
  return async function(req, res) {
    printSeparator()
    printSeparator()
    console.log(`${req.method} ${req.originalUrl}`)
    console.log(`Body: ${encodePrettily(req.body)}`)
    printSeparator()
    let result = (f ? await f(req) : notImplemented()) || notImplemented()
    console.log(`Status: ${result.status}`)
    console.log(`Response: ${encodePrettily(result.body)}`)
    res.status(result.status).json(result.body)
    printSeparator()
    printSeparator()
  }
}