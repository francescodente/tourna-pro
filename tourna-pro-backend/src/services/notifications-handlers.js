const { Log, User } = require('../models')
const eventBus = require('./event-bus')

async function publishLog(log) {
  log.readBy = []
  log.recipients = log.recipients || []
  log.date = new Date(Date.now())
  let logModel = new Log(log)
  await logModel.save()
  eventBus.publish('newLog', logModel)
}

exports.memberAdded = async (team, memberId, addedBy) => {
  let newMember = await User.findById(memberId)
  let addedByUser = await User.findById(addedBy)
  await publishLog({
    teamId: team._id,
    type: 'memberAdded',
    recipients: [memberId],
    parameters: {
      team: {
        id: team._id,
        name: team.name
      },
      added: {
        id: memberId,
        name: newMember.username
      },
      addedBy: {
        id: addedBy,
        name: addedByUser.username
      }
    }
  })
}

exports.memberRemoved = async (team, memberId, removedBy) => {
  let removedMember = await User.findById(memberId)
  let removedByUser = await User.findById(removedBy)
  await publishLog({
    teamId: team._id,
    type: 'memberRemoved',
    recipients: [memberId],
    parameters: {
      team: {
        id: team._id,
        name: team.name
      },
      removed: {
        id: memberId,
        name: removedMember.username
      },
      removedBy: {
        id: removedBy,
        name: removedByUser.username
      }
    }
  })
}

exports.achievementUnlocked = async (achievement, userId) => {
  await publishLog({
    type: 'achievementUnlocked',
    recipients: [userId],
    parameters: {
      achievement,
      userId
    }
  })
}