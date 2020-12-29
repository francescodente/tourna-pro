const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('teams', function (app, controller) {
    app.route('/teams')
        .post(authorize, action(controller.createTeam))
        .get(authorize, action(controller.getAllTeams))

    app.route('/teams/:id')
        .put(authorize, action(controller.updateTeam))
        .delete(authorize, action(controller.deleteTeam))

    app.route('/teams/:id/image')
        .put(authorize, action(controller.setTeamImage))
})