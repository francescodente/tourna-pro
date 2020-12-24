const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('participation', function (app, controller) {
    app.route('/tournaments/:id/participants')
        .post(action(controller.addParticipation))
        .get(action(controller.getAllParticipations))

    app.route('/tournaments/:id/participants/:participantId')
        .delete(action(controller.removeParticipation))
        .put(action(controller.updateParticipation))
})