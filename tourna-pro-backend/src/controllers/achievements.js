const mongoose = require('mongoose')
const Achievements = require('../models/achievements')
const User = require('../models/user')(mongoose)
const ok = require('../utils/action-results')

exports.getAllAchievements = function(req) {
    return Promise.resolve(ok(Achievements));
}

exports.getAchievementByUser = async function(req) {
    let userAchievements = await User.findById(req.params.id).select('unlockedAchievements')
    return ok(userAchievements)
}