const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('tournaments', function (app, controller) {
    app.route('/tournaments')
        .post(authorize, action(controller.createTournament))
        .get(authorize, action(controller.getAllTournaments))

    app.route('/tournaments/:id')
        .get(authorize, action(controller.getTournamentById))
        .put(authorize, action(controller.updateTournament))
        .delete(authorize, action(controller.removeTournament))
})