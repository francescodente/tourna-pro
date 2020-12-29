const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('team-members', function (app, controller) {
    app.route('/teams/:id/members')
        .get(authorize, action(controller.getTeamMembers))
        .post(authorize, action(controller.addMember))

    app.route('/teams/:id/members/:userId')
        .delete(authorize, action(controller.removeMember))
})