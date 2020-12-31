const { User } = require('../models');
const Achievements = require('../models/achievements')
const { ok, notFound } = require('../utils/action-results')

exports.getAllAchievements = function (req) {
  return Promise.resolve(ok(Achievements));
}

function errorMessage(id) {
  return `Could not found user with id ${id}`
}

exports.getAchievementByUser = async function (req) {
  let userAchievements = await User.findById(req.params.id).select('unlockedAchievements')
  if (!userAchievements) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(userAchievements.unlockedAchievements)
}