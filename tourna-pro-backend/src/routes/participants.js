const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('participants', function (app, controller) {
    app.route('/tournaments/:id/participants')
        .get(authorize, action(controller.getParticipants))

    app.route('/tournaments/:id/participants/:participantId')
        .delete(authorize, action(controller.retireParticipant))
})