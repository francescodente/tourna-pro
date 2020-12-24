const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('tournament-types', function (app, controller) {
    app.route('/tournamenttypes')
        .get(action(controller.getAllTournamentsTypes))
})