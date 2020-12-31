const { Activity } = require('../models')
const { ok, notFound } = require('../utils/action-results')

function activityDto(activity) {
  return {
    id: activity._id,
    name: activity.name
  }
}
exports.getAllActivities = async function (req) {
  let activities = await Activity.find()
  if(!activities){
    return notFound("No activities were found in the system")
  }
  return await ok(activities.map(x => activityDto(x)))
}