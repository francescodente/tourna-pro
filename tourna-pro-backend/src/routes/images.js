const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('images', function (app, controller) {
  app.route('/images/:id')
    .get(action(controller.getImage))
})