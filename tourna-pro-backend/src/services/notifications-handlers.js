const { Log, User, Team, ParticipationRequest } = require('../models')
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


async function generateRequestLog(request, tournament, type) {
  switch (request.type) {
    case 'USER': {
      let user = await User.findById(request.userId)
      return {
        tournamentId: tournament._id,
        type: 'userRequest' + type,
        recipients: [request.userId, ...tournament.owners],
        parameters: {
          tournament: {
            id: tournament._id,
            name: tournament.name
          },
          user: {
            id: request.userId,
            name: user.username,
          }
        }
      }
    }
    case 'TEAM': {
      let team = await Team.findById(request.teamId)
      return {
        teamId: request.teamId,
        tournamentId: tournament._id,
        type: 'teamRequest' + type,
        recipients: [...team.members, ...tournament.owners],
        parameters: {
          tournament: {
            id: tournament._id,
            name: tournament.name
          },
          team: {
            id: request.teamId,
            name: team.name,
          }
        }
      }

    }
    default: return null;
  }
}

exports.requestAdded = async function (request, tournament) {
  let log = null
  let type = 'Added'
  switch (request.type) {
    case 'USER': {
      let user = await User.findById(request.userId)
      log = {
        tournamentId: tournament._id,
        type: 'userRequest' + type,
        recipients: [...tournament.owners],
        parameters: {
          tournament: {
            id: tournament._id,
            name: tournament.name
          },
          user: {
            id: request.userId,
            name: user.username,
          }
        }
      }
    }
    case 'TEAM': {
      let team = await Team.findById(request.teamId)
      log = {
        teamId: request.teamId,
        tournamentId: tournament._id,
        type: 'teamRequest' + type,
        recipients: [...team.members, ...tournament.owners],
        parameters: {
          tournament: {
            id: tournament._id,
            name: tournament.name
          },
          team: {
            id: request.teamId,
            name: team.name,
          }
        }
      }

    }
    default: log = null;
  }
  if (log) await publishLog(log)
}

exports.requestAccepted = async function (request, tournament) {
  let log = null
  let type= 'Accepted'
  switch (request.type) {
    case 'USER': {
      let user = await User.findById(request.userId)
      log = {
        tournamentId: tournament._id,
        type: 'userRequest' + type,
        recipients: [user._id],
        parameters: {
          tournament: {
            id: tournament._id,
            name: tournament.name
          },
          user: {
            id: request.userId,
            name: user.username,
          }
        }
      }
    }
    case 'TEAM': {
      let team = await Team.findById(request.teamId)
      log = {
        teamId: request.teamId,
        tournamentId: tournament._id,
        type: 'teamRequest' + type,
        recipients: [...team.members],
        parameters: {
          tournament: {
            id: tournament._id,
            name: tournament.name
          },
          team: {
            id: request.teamId,
            name: team.name,
          }
        }
      }

    }
    default: log = null;
  }
  if (log) await publishLog(log)
}

exports.requestRejected = async function (request, tournament) {
  let log = null
  let type='Rejected'
  switch (request.type) {
    case 'USER': {
      let user = await User.findById(request.userId)
      log = {
        tournamentId: tournament._id,
        type: 'userRequest' + type,
        recipients: [user._id],
        parameters: {
          tournament: {
            id: tournament._id,
            name: tournament.name
          },
          user: {
            id: request.userId,
            name: user.username,
          }
        }
      }
    }
    case 'TEAM': {
      let team = await Team.findById(request.teamId)
      log = {
        teamId: request.teamId,
        tournamentId: tournament._id,
        type: 'teamRequest' + type,
        recipients: [...team.members],
        parameters: {
          tournament: {
            id: tournament._id,
            name: tournament.name
          },
          team: {
            id: request.teamId,
            name: team.name,
          }
        }
      }

    }
    default: log = null;
  }
  if (log) await publishLog(log)
}

exports.tournamentStarted = async function (tournament) {

}

exports.tournamentEnded = async function (tournament, ranking) {

}

async function participantFieldsFromRequest(request) {
  switch (request.type) {
    case 'USER': {
      let user = await User.findById(request.userId);
      return {
        participantName: user.username,
        recipients: [request.userId]
      }
    }
    case 'TEAM': {
      let team = await Team.findById(request.teamid);
      return {
        participantName: team.name,
        recipients: [team.members]

      }

    }
    case 'PARTICIPANT': {
      return {
        participantName: request.participant.name,
        recipients: []
      }
    }
    default: return null;
  }
}


exports.matchStarted = async function (match, tournament) {
  let request1 = await ParticipationRequest.findById(match.participant1.id)
  let request2 = await ParticipationRequest.findById(match.participant2.id)
  let participant1Fields = await participantFieldsFromRequest(request1)
  let participant2Fields = await participantFieldsFromRequest(request2)

  let log = {
    type: 'matchStarted',
    recipients: [...participant1Fields.recipients, ...participant2Fields.recipients, ...tournament.owners],
    parameters: {
      tournament: {
        id: tournament._id,
        name: tournament.name
      },
      participant1: {
        name: participant1Fields.name
      },
      participant2: {
        name: participant2Fields.name
      }
    }
  }
  await publishLog(log)

}

exports.matchResultUpdated = async function (match, tournament) {
  let request1 = await ParticipationRequest.findById(match.participant1.id)
  let request2 = await ParticipationRequest.findById(match.participant2.id)
  let participant1Fields = await participantFieldsFromRequest(request1)
  let participant2Fields = await participantFieldsFromRequest(request2)

  let log = {
    type: 'matchUpdated',
    recipients: [...participant1Fields.recipients, ...participant2Fields.recipients, ...tournament.owners],
    parameters: {
      tournament: {
        id: tournament._id,
        name: tournament.name
      },
      participant1: {
        name: participant1Fields.name
      },
      participant2: {
        name: participant2Fields.name
      }
    }
  }
  await publishLog(log)
}

exports.roundStarted = async function (tournament) {

}

exports.roundEnded = async function (tournament) {

}

async function generateOwnerLog(id, tournament, action, action) {
  let newOwner = await User.findById(id)
  let agent = await User.findById(action)
  return {
    tournamentId: tournament._id,
    type: 'owner' + action,
    recipients: [id, ...tournament.owners],
    parameters: {
      tournament: {
        id: tournament._id,
        name: tournament.name
      },
      user: {
        id: id,
        name: newOwner.username
      },
      agent: {
        id: action,
        name: agent.username
      }
    }
  }
}

exports.ownerAdded = async function (id, tournament, addedBy) {
  let log = await generateOwnerLog(id, tournament, addedBy, 'Added')
  if (log) await publishLog(log)
}

exports.ownerRemoved = async function (id, tournament, removedBy) {
  let log = await generateOwnerLog(id, tournament, removedBy, 'Removed')
  if (log) await publishLog(log)
}

exports.participantRetired = async function (id, tournament) {

}

exports.teamCreated = async function (team, createdBy) {
  let user = User.findById(createdBy)
  let log = {
    teamId: team._id,
    type: 'teamCreated',
    recipients: [],
    parameters: {
      team: {
        id: team._id,
        name: team.name
      },
      agent: {
        id: user._id,
        name: user.username
      }
    }
  }
  await publishLog(log)
}

exports.tournamentCreated = async function (tournament, createdBy) {
  let user = User.findById(createdBy)
  let log = {
    tournamentId: tournament._id,
    type: 'tournamentCreated',
    recipients: [],
    parameters: {
      tournament: {
        id: tournament._id,
        name: tournament.name
      },
      agent: {
        id: user._id,
        name: user.username
      }
    }
  }
  await publishLog(log)
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