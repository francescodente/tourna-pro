const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('matches', function (app, controller) {
    app.route('/tournaments/:id/matches')
        .get(authorize, action(controller.getAllMatchesByTournament))
        .put(authorize, action(controller.startNextRound))

    app.route('/tournaments/:id/matches/:matchId')
        .put(authorize, action(controller.updateMatchResult))

    app.route('/tournaments/:id/matches/:matchId/start')
        .put(authorize, action(controller.startMatch))
})