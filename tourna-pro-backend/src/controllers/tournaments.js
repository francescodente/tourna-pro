const { Tournament } = require('../models')
const { ok, created, notFound, notImplemented } = require('../utils/action-results')

const defaultStatus = "PENDING"
const defaultPageSize = 30

function errorMessage(id) {
  return `Could not found tournament with id ${id}`
}

function tournamentDto(tournament) {
  return {
    id: tournament._id,
    maxParticipants: tournament.maxParticipants,
    date: tournament.date,
    name: tournament.name,
    activityId: tournament.activity,
    type: tournament.type,
    location: tournament.location,
    description: tournament.description,
    mode: tournament.mode,
    maxAge: tournament.maxAge,
    minAge: tournament.minAge,
    gender: tournament.gender,
    visibility: tournament.visibility,
    status: tournament.status
  }
}


exports.createTournament = async function (req) {
  let tournamentModel = new Tournament({
    name: req.body.name,
    description: req.body.description,
    date: new Date(req.body.date),
    activity: req.body.activity,
    type: req.body.type,
    location: req.body.location,
    mode: req.body.mode,
    maxAge: req.body.maxAge,
    minAge: req.body.minAge,
    maxParticipants: req.body.maxParticipants,
    gender: req.body.gender,
    visibility: req.body.visibility,
    status: defaultStatus,
    participants: [],
    matches: [],
    owners: [req.userId]
  })
  let tournament = await tournamentModel.save()
  return created(tournamentDto(tournament))
}

//TODO review
exports.getAllTournaments = async function (req) {
  let num = req.params.pageNum || 1
  let size = req.params.pageSize || defaultPageSize
  let query = Tournament.find()
    .sort('-date')
    .skip(num * size)
    .limit(size)

  if (req.params.mode) {
    query = query.where('mode').equals(req.params.mode)
  }
  if (req.params.from) {
    query = query.where('date').gt(req.params.from)
  }
  if (req.params.to) {
    query = query.where('date').lt(req.params.to)
  }
  if (req.params.activities) {
    query = query.where('activity').in(req.params.activities)
  }
  if (req.params.location) {
    query = query.where('location').equals(req.params.location)
  }

  let tournaments = await query.exec();
  return ok(tournaments.map(a => tournamentDto(a)))
}

exports.getTournamentById = async function (req) {
  let tournament = await Tournament.findById(req.params.id);
  if (!tournament) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(tournamentDto(tournament))
}

exports.updateTournament = async function (req) {
  let updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    date: new Date(req.body.date),
    activity: req.body.activity,
    type: req.body.type,
    location: req.body.location,
    mode: req.body.mode,
    maxAge: req.body.maxAge,
    minAge: req.body.minAge,
    maxParticipants: req.body.maxParticipants,
    gender: req.body.gender,
    visibility: req.body.visibility,
    status: req.body.status,
  }, { new: true })
  if (!updatedTournament) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(tournamentDto(updatedTournament))
}

exports.removeTournament = async function (req) {
  let deletedTournament = await Tournament.findeByIdAndRemove(req.params.id)
  if (!deletedTournament) {
    return notFound(errorMessage(req.params.id))
  }
  return ok(tournamentDto(deletedTournament))
}


