const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')
const { upload } = require('./upload-utils')

module.exports = mapControllerRoutes('teams', function (app, controller) {
    app.route('/teams')
        .post(authorize, action(controller.createTeam))
        .get(authorize, action(controller.getAllTeams))

    app.route('/teams/:id')
        .get(authorize, action(controller.getTeam))
        .put(authorize, action(controller.updateTeam))
        .delete(authorize, action(controller.deleteTeam))

    app.route('/teams/:id/image')
        .put(authorize, upload.single('team_picture'), action(controller.setTeamImage))
})