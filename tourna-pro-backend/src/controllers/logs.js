const { Log } = require('../models')
const { ok, notFound, forbidden } = require('../utils/action-results')

function logDto(log, userId) {
  return {
    id: log._id,
    type: log.type,
    date: log.date,
    read: log.readBy.includes(userId),
    parameters: log.parameters,
    tournamentId: log.tournamentId,
    teamId: log.teamId
  }
}

async function getLogsByFilter(req, filter) {
  let pageNum = req.query.pageNum || 0
  let pageSize = req.query.pageSize || 30
  let logs = await Log.find(filter)
    .sort('-date')
    .skip(pageNum * pageSize)
    .limit(pageSize)
  
    return ok(logs.map(x => logDto(x, req.params.id)))
}

exports.getUnreadNotifications = async function (req) {
  let count = await Log.countDocuments({
    recipients: req.params.id,
    readBy: { $ne: req.params.id }
  })
  return ok({ count })
}

exports.getUserLogs = async function (req) {
  return await getLogsByFilter(req, {
    recipients: req.params.id
  })
}

exports.getTeamLogs = async function (req) {
  return await getLogsByFilter(req, {
    teamId: req.params.id
  })
}

exports.getTeamLogs = async function (req) {
  return await getLogsByFilter(req, {
    tournamentId: req.params.id
  })
}

exports.markAsRead = async function (req) {
  let log = await Log.findOneAndUpdate({
    _id: req.params.logId,
    recipients: req.params.id
  }, { $addToSet: { readBy: req.params.id } }, { new: true })
  if (!log) {
    return notFound(`Unable to find log with id ${req.params.logId}`)
  }
  return ok(logDto(log, req.params.id))
}