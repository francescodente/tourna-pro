const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('interests', function (app, controller) {
    app.route('/users/:id/interests')
        .get(action(controller.getUserInterests))
        .put(action(controller.modifyInterestsFromUser))
})