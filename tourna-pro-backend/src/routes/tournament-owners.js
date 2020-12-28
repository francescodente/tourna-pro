const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('tournament-owners', function (app, controller) {

    app.route('/tournaments/:id/owners')
        .get(action(controller.getOwners))
        .post(action(controller.addOwner))

    app.route('/tournaments/:id/owners/:userId')
        .delete(action(controller.removeOwner))
})