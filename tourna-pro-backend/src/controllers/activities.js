const { Activity } = require('../models')
const { ok } = require('../utils/action-results')

function activityDto(activity) {
  return {
    id: activity._id,
    name: activity.name
  }
}
exports.getAllActivities = async function (req) {
  return await ok(Activity.find().exec().map(x => activityDto(x)))
}