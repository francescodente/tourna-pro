const { User } = require('../models');
const { ok, notFound } = require('../utils/action-results');

function interestsDto(interests) {
  return interests;
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
  let updatedInterests = await User.findByIdAndUpdate(req.params.id, {
    interests: req.body.interests
  }, { new: true })
  if (!updatedInterests) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(interestsDto(updatedInterests))
}