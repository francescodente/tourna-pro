const { Tournament } = require('../models')
const { ok, created, notFound, badRequest } = require('../utils/action-results')
const {activityExists} = require('../models/activities')
const {typeExists} = require('../models/tournament-types')
const {genderExists} = require('../models/genders')
const {modeExists} = require('../models/tournament-modes')

const defaultStatus = "PENDING"
const defaultPageSize = 30

function tournamentNotFound(id) {
  return `Could not found tournament with id ${id}`
}

function tournamentNotAllowed(id) {
  return `Could not update tournament with id ${id} because the status is ACTIVE`
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
  if(!activityExists(req.body.activityId)){
    return badRequest(`Selected activity: "${req.body.activityId}" does not exist`)
  }
  if(!typeExists(req.body.type)){
    return badRequest(`Selected type: "${req.body.type}" is not supported`)
  }
  if(!modeExists(req.body.mode)){
    return badRequest(`Selected mode: "${req.body.mode}" is not supported`)
  }
  if(!genderExists(req.body.gender)){
    return badRequest(`Selected gender: "${req.body.mode}" is not supported`)
  }
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
  let num = req.query.pageNum || 0
  let size = req.query.pageSize || defaultPageSize
  let query = Tournament.find()
    .sort('-date')
    .skip(num * size)
    .limit(size)
  if(req.query.ownedBy){
    query = query.where({owners: req.query.ownedBy})
  }
  if (req.query.mode) {
    query = query.where('mode').equals(req.query.mode)
  }
  if (req.query.from) {
    query = query.where('date').gt(req.query.from)
  }
  if (req.query.to) {
    query = query.where('date').lt(req.query.to)
  }
  if (req.query.activities) {
    console.log(req.query.activities)
    let a = JSON.parse(req.query.activities)
    query = query.where('activity').in(a)
  }
  if (req.query.location) {
    query = query.where('location').equals(req.query.location)
  }
  let tournaments = await query.exec();
  
  if(req.query.subscribedBy){
    //TODO
  }

  return ok(tournaments.map(a => tournamentDto(a)))
}

exports.getTournamentById = async function (req) {
  let tournament = await Tournament.findById(req.params.id);
  if (!tournament) {
    return notFound(tournamentNotFound(req.params.id))
  }
  return ok(tournamentDto(tournament))
}

exports.updateTournament = async function (req) {
  let updatedTournament = await Tournament.findById(req.params.id)
  if (!updatedTournament) {
    return notFound(tournamentNotFound(req.params.id))
  }
  if(updatedTournament.status == 'ACTIVE'){
    return badRequest(tournamentNotAllowed(req.oarams.id))
  }
  updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, {
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

  return ok(tournamentDto(updatedTournament))
}

exports.removeTournament = async function (req) {
  let deletedTournament = await Tournament.findByIdAndRemove(req.params.id)
  if (!deletedTournament) {
    return notFound(tournamentNotFound(req.params.id))
  }
  return ok(tournamentDto(deletedTournament))
}


