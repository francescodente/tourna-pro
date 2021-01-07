const { notImplemented, internalServerError } = require("../utils/action-results")

const useMock = false

function printSeparator() {
  console.log("===========================================================================================")
}

exports.mapControllerRoutes = function (controllerName, mapper) {
  const controllersFolder = useMock ? 'mock-controllers' : 'controllers'
  const controller = require(`../${controllersFolder}/${controllerName}`)
  return app => mapper(app, controller)
}

exports.action = function (f) {
  return async function (req, res) {
    try {
      printSeparator()
      console.log(`${req.method} ${req.originalUrl}`)
      console.log('Body:', req.body)
      printSeparator()
      let result = (f ? await f(req) : notImplemented()) || notImplemented()
      res.setResult(result)
      printSeparator()
    } catch (error) {
      res.setResult(internalServerError(error))
    }
  }
}