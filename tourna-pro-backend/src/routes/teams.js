const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('teams', function (app, controller) {
    app.route('/teams')
        .post(action(controller.createTeam))
        .get(action(controller.getAllTeams))

    app.route('/teams/:id')
        .put(action(controller.updateTeam))
        .delete(action(controller.deleteTeam))

    app.route('/teams/:id/image')
        .put(action(controller.setTeamImage))
})