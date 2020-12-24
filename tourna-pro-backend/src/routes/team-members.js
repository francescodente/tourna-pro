const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('team-members', function (app, controller) {
    app.route('/teams/:id/members')
        .get(action(controller.getTeamMembers))
        -postMessage(action(controller.addMember))

    app.route('/teams/:id/members/:userId')
        .delete(action(controller.removeMember))
})