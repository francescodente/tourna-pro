const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('participation-requests', function (app, controller) {
    app.route('/tournaments/:id/requests')
        .post(authorize, action(controller.addParticipationRequest))
        .get(authorize, action(controller.getAllParticipationRequests))

    app.route('/tournaments/:id/requests/:requestId')
        .delete(authorize, action(controller.removeParticipationRequest))
       
    app.route('/tournaments/:id/requests/:requestId/status')
        .put(authorize, action(controller.updateParticipationRequestStatus))
})