const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('participants', function (app, controller) {
    app.route('/tournaments/:id/participants')
        .get(action(controller.getParticipants))

    app.route('/tournaments/:id/participant/:participantId')
        .delete(action(controller.retireParticipant))
})