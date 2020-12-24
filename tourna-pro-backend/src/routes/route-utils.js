const useMock = false

exports.mapControllerRoutes = function(controllerName, mapper) {
  const controllersFolder = useMock ? 'mock-controllers' : 'controllers'
  const controller = require(`../${controllersFolder}/${controllerName}`)
  return app => mapper(app, controller)
}

exports.action = function(f) {
  return function(req, res) {
    if (f) {
      f(req, res)
    } else {
      res.status(500).send({
        error: 'Not implemented'
      })
    }
  }
}