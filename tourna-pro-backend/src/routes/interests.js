const authorize = require('../middleware/authorize')
const userPermissions = require('../middleware/user-permissions')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('interests', function (app, controller) {
    app.route('/users/:id/interests')
        .get(authorize, action(controller.getUserInterests))
        .put(authorize, userPermissions(req => req.params.id), action(controller.modifyInterestsFromUser))
})