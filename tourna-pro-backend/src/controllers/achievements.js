const { User } = require('../models');
const Achievements = require('../models/achievements')
const { ok, notFound } = require('../utils/action-results')

function achievementDto(achievement) {
  return {
    id: achievement.id,
    name: achievement.name,
    description: achievement.description,
    image: achievement.description
  }
}

exports.getAllAchievements = function (req) {
  return Promise.resolve(ok(Achievements.map(achievementDto)));
}

function errorMessage(id) {
  return `Could not find user with id ${id}`
}

exports.getAchievementByUser = async function (req) {
  let userAchievements = await User.findById(req.params.id).select('unlockedAchievements')
  if (!userAchievements) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(userAchievements.unlockedAchievements)
}