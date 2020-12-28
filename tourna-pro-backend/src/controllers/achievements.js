const mongoose = require('mongoose');
const { User } = require('../models');
const Achievements = require('../models/achievements')
const { ok, notFound } = require('../utils/action-results')

exports.getAllAchievements = function (req) {
  return Promise.resolve(ok(Achievements));
}

exports.getAchievementByUser = async function (req) {
  let userAchievements = await User.findById(req.params.id).select('unlockedAchievements')
  if (!userAchievements) {
    return notFound(`Cannot find a user with id ${req.params.id}`)
  }
  return ok(userAchievements)
}