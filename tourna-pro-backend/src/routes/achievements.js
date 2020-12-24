const { mapControllerRoutes, action } = require('./route-utils')

module.exports = mapControllerRoutes('achievements', function (app, controller) {
    app.route('/achievements')
        .get(action(controller.getAllAchievements))

    app.route('/users/:id/achievements')
        .get(action(controller.getAchievementByUser))
})