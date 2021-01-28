const { ParticipationRequest, User, Team } = require('../models')

async function unlockAchievement(userIds, achievementId) {
  let users = await User.find({
    _id: { $in: userIds }
  })
  for (let user of users) {
    if (!user.unlockedAchievements.includes(achievementId)) {
      user.unlockedAchievements.push(achievementId)
      await user.save()
    }
  }
}

async function findAllParticipants(tournament, predicate = () => true) {
  let requests = await ParticipationRequest.find({
    _id: { $in: tournament.participants.filter(predicate).map(p => p.id) }
  })
  let teams = await Team.find({
    _id: { $in: requests.filter(r => r.teamId).map(r => r.teamId) }
  })
  return [
    ...teams.flatMap(t => t.members),
    ...requests.filter(r => r.userId).map(r => r.userId)
  ]
}

const handlers = {
  async tournamentEnded(tournament, ranking) {
    let participants = await findAllParticipants(tournament, p => p.status == 'ACTIVE')

    unlockAchievement(participants.teamParticipants, 'GIOCO_DI_SQUADRA')
    unlockAchievement(participants.userParticipants, 'LUPO_SOLITARIO')
  }
}