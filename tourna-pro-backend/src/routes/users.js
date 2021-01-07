const authorize = require('../middleware/authorize')
const userPermissions = require('../middleware/user-permissions')
const { mapControllerRoutes, action } = require('./route-utils')
const { upload } = require('./upload-utils')

module.exports = mapControllerRoutes('users', function(app, controller) {
  app.route('/users')
    .post(action(controller.registerUser))
  
  app.route('/users/:id')
    .get(authorize, action(controller.getUser))
    .put(authorize, userPermissions(req => req.params.id), action(controller.modifyUser))
  
  app.route('/users/:id/image')
    .put(authorize, upload.single('profile_picture'), userPermissions(req => req.params.id), action(controller.setProfilePicture))
})