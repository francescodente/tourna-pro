const authorize = require('../middleware/authorize')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('rankings', function (app, controller) {
    app.route('/tournaments/:id/ranking')
        .get(authorize, action(controller.getTournamentRanking))
})