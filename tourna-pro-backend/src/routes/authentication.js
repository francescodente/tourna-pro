const authorize = require('../middleware/authorize')
const userPermissions = require('../middleware/user-permissions')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('authentication', function (app, controller) {
  app.route('/login')
    .post(action(controller.login))

  app.route('/users/:id/password')
    .put(authorize, userPermissions(req => req.params.id), action(controller.updatePassword))
})