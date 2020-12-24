const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('authentication', function (app, controller) {
    app.route('/login')
        .post(action(controller.login))

    app.route('/users/:id/password')
        .put(action(controller.updatePassword))
})