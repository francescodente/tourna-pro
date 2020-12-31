const activities = require('../models/activities')
const { ok } = require('../utils/action-results')

function activityDto(activity) {
  return {
    id: activity.id,
    name: activity.name
  }
}
exports.getAllActivities = function (req) {
  return ok(activities.map(activityDto))
}