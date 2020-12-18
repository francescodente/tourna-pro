const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('users', function(app, controller) {
  app.route('/users')
    .post(action(controller.registerUser))
  
  app.route('/users/:id')
    .get(action(controller.getUser))
    .put(action(controller.modifyUser))
  
  app.route('/users/:id/image')
    .put(action(controller.setProfilePicture))
})