const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('interests', function (app, controller) {
    app.route('/users/:id/interests')
        .get(authorize, action(controller.getUserInterests))
        .put(authorize, action(controller.modifyInterestsFromUser))
})