const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('users', function(app, controller) {
  app.route('/users')
    .post(action(controller.registerUser))
  
  app.route('/users/:id')
    .get(authorize, action(controller.getUser))
    .put(authorize, action(controller.modifyUser))
  
  app.route('/users/:id/image')
    .put(authorize, action(controller.setProfilePicture))
})