const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('participation-requests', function (app, controller) {
    app.route('/tournaments/:id/requests')
        .post(action(controller.addParticipationRequest))
        .get(action(controller.getAllParticipationRequests))

    app.route('/tournaments/:id/requests/:participantId')
        .delete(action(controller.removeParticipationRequest))
        .put(action(controller.updateParticipationRequest))
})