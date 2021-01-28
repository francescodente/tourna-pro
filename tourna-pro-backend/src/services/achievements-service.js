const { User } = require('../models')
const Activities  = require('../models/activities')
const { subscribeAll } = require('./event-bus')
const { onStartup } = require('./notifications-service')
const { findAllParticipantsGroupedByRequest } = require('./utils')

async function unlockAchievements(userIds, ...achievements) {
  if (userIds.length == 0) {
    return
  }

  let users = await User.find({
    _id: { $in: userIds }
  })
  for (let user of users) {
    for (let achievement of achievements) {
      if (!user.unlockedAchievements.includes(achievement)) {
        user.unlockedAchievements.push(achievement)
        publish('achievementUnlocked', achievement, user._id)
      }
    }
    await user.save()
  }
}

const handlers = {
  async tournamentEnded(tournament, result) {
    let participants = await findAllParticipantsGroupedByRequest(tournament, p => p.status == 'ACTIVE')
    let users = Object.values(participants).flat()

    if (tournament.mode == 'TEAMS') {
      await unlockAchievements(users, 'GIOCO_DI_SQUADRA')
    } else {
      await unlockAchievements(users, 'LUPO_SOLITARIO')
    }

    let ranking = result.ranking
    let first = ranking[0].id.toString()
    let last = ranking[ranking.length - 1].id.toString()
    let activity = Activities.findById(tournament.activity)
    await unlockAchievements(participants[first], 'AND_THE_WINNER_IS', activity.achievement)
    await unlockAchievements(participants[last], 'PREMIO_DI_CONSOLAZIONE')
  },
  async teamCreated(_, createdBy) {
    await unlockAchievements([createdBy], 'L_UNIONE_FA_LA_FORZA')
  },
  async tournamentCreated(_, createdBy) {
    await unlockAchievements([createdBy], 'MAESTRO_DEI_GIOCHI')
  },
  async memberAdded(_, userId, addedBy) {
    if (userId != addedBy) {
      await unlockAchievements([userId], 'BUONI_AMICI')
    }
  }
}

module.exports = {
  onStartup() {
    subscribeAll(handlers)
  }
}