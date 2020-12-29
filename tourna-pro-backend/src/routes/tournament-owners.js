const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('tournament-owners', function (app, controller) {

    app.route('/tournaments/:id/owners')
        .get(authorize, action(controller.getOwners))
        .post(authorize, action(controller.addOwner))

    app.route('/tournaments/:id/owners/:userId')
        .delete(authorize, action(controller.removeOwner))
})