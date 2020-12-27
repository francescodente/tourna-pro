const mongoose = require('mongoose')
const Activities = require('../models/activity')(mongoose)
const { ok } = require('../utils/action-results')

function activityDto(activity){
    return {
        id: activity._id,
        name: activity.name
    }
}
exports.getAllActivities = async function(req) {
    return await ok(Activities.find().exec().map(x => activityDto(x)))
}