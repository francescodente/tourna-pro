const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('matches', function (app, controller) {
    app.route('/tournaments/:id/matches')
        .get(action(controller.getAllMatchesByTournament))

    app.route('/tournaments/:id/matches/:matchId')
        .put(action(controller.updateMatchResult))

    app.route('/tournaments/:id/matches')
        .put(action(controller.lockMatches))
})