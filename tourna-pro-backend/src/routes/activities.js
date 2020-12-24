const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('activities', function (app, controller) {
    app.route('/activities')
        .get(action(controller.getAllActivities))
})