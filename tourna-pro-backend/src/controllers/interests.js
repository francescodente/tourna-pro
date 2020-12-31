const { User } = require('../models');
const activities = require('../models/activities');
const { ok, notFound, badRequest } = require('../utils/action-results');

function interestsDto(interests) {
  return interests.interests;
}

function errorMessage(id) {
  return `Could not found user with id ${id}`
}

exports.getUserInterests = async function (req) {
  let userInterests = await User.findById(req.params.id).select('interests')
  if (!userInterests) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(interestsDto(userInterests))
}

exports.modifyInterestsFromUser = async function (req) {
  if(!req.body.interests.every(x => activities.map(a => a.id).includes(x))){
    return badRequest("Some activities do not match with system activities")
  }
  let updatedInterests = await User.findByIdAndUpdate(req.params.id, {
    interests: req.body.interests
  }, { new: true })
  if (!updatedInterests) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(interestsDto(updatedInterests))
}