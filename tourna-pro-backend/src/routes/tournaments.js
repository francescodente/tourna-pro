const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('tournaments', function (app, controller) {
    app.route('/tournaments')
        .post(action(controller.createTournament))
        .get(action(controller.getAllTournaments))

    app.route('/tournaments/:id')
        .put(action(controller.updateTournament))
        .delete(action(controller.removeTournament))
})