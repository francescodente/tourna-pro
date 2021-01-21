const authorize = require('../middleware/authorize')
const userPermissions = require('../middleware/user-permissions')
const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('logs', function (app, controller) {
  app.route('/users/:id/logs/unread')
    .get(authorize, userPermissions(req => req.params.id), action(controller.getUnreadNotifications))

  app.route('/users/:id/logs')
    .get(authorize, userPermissions(req => req.params.id), action(controller.getUserLogs))

  app.route('/tournaments/:id/logs')
    .get(authorize, action(controller.getTournamentLogs))

  app.route('/teams/:id/logs')
    .get(authorize, action(controller.getTeamLogs))

  app.route('/users/:id/logs/:logId/read')
    .put(authorize, userPermissions(req => req.params.id), action(controller.markAsRead))
})