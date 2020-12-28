const { User } = require('../models');
const { ok } = require('../utils/action-results');

function interestsDto(interests) {
  return interests;
}
exports.getUserInterests = async function (req) {
  return ok(interestsDto(await User.findById(req.params.id).select('interests')))
}

exports.modifyInterestsFromUser = async function (req) {
  let updatedInterests = await User.findByIdAndUpdate(req.params.id, {
    interests: req.body.interests
  }, { new: true })
  return ok(interestsDto(updatedInterests))
}