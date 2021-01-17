const { Tournament, ParticipationRequest, Team } = require('../models')
const { ok, created, notFound, badRequest, forbidden } = require('../utils/action-results')
const { activityExists } = require('../models/activities')
const { typeExists } = require('../models/tournament-types')
const { genderExists } = require('../models/genders')
const { modeExists, isTeam } = require('../models/tournament-modes')
const team = require('../models/team')

const mongoose = require('mongoose');

const defaultStatus = "PENDING"
const defaultPageSize = 30

function tournamentNotFound(id) {
  return `Could not found tournament with id ${id}`
}

function tournamentNotAllowed(id) {
  return `Could not update tournament with id ${id} because the status is ACTIVE`
}

async function isSubscribed(userId, tournament) {
  let participants = tournament.participants.filter(x => x.status == 'ACTIVE')
  if (!participants)
    return false
  let requests = await ParticipationRequest.aggregate(
    [
      {
        $lookup: {
          from: 'Teams',
          localField: 'teamId',
          foreignField: '_id',
          as: 'team'
        }
      },
      {
        $match: {
          $and: [
            { _id: { $in: participants.map(x => x.id) } },
            {
              $or: [
                { userId: mongoose.Types.ObjectId(userId) },
                { 'team.members': mongoose.Types.ObjectId(userId) }
              ]
            }
          ]
        }
      }
    ])
  if (requests) {
    return true;
  }
}

function tournamentDto(tournament, userId, isSubscribed) {
  return {
    id: tournament._id,
    maxParticipants: tournament.maxParticipants,
    currentParticipants: tournament.participants.length,
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
    status: tournament.status,
    owned: tournament.owners.includes(userId),
    subscribed: isSubscribed
  }
}


exports.createTournament = async function (req) {
  if (!activityExists(req.body.activityId)) {
    return badRequest(`Selected activity: "${req.body.activityId}" does not exist`)
  }
  if (!typeExists(req.body.type)) {
    return badRequest(`Selected type: "${req.body.type}" is not supported`)
  }
  if (!modeExists(req.body.mode)) {
    return badRequest(`Selected mode: "${req.body.mode}" is not supported`)
  }
  if (!genderExists(req.body.gender)) {
    return badRequest(`Selected gender: "${req.body.mode}" is not supported`)
  }
  let tournamentModel = new Tournament({
    name: req.body.name,
    description: req.body.description,
    date: new Date(req.body.date),
    activity: req.body.activityId,
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
  return created(tournamentDto(tournament, req.userId, false))
}

exports.getAllTournaments = async function (req) {
  let num = req.query.pageNum || 0
  let size = req.query.pageSize || defaultPageSize
  let filter = {}

  if (req.query.owned) {
    filter.owners = req.userId
  }
  if (req.query.mode) {
    filter.mode = req.query.mode
  }
  if (req.query.from) {
    filter.date = { $gte: req.query.from }
  }
  if (req.query.to) {
    filter.date = { $lte: req.query.from }
  }
  if (req.query.activities) {
    let a = JSON.parse(req.query.activities)
    filter.activity = { $in: a }
  }
  if (req.query.location) {
    filter.location = req.query.location
  }
  let aggregateArray = [
    {
      $lookup: {
        from: 'Teams',
        localField: 'teamId',
        foreignField: '_id',
        as: 'team'
      }
    },
    {
      $match: {
        $or: [
          { userId: mongoose.Types.ObjectId(req.userId) },
          { 'team.members': mongoose.Types.ObjectId(req.userId) }
        ]

      }
    }
  ]
  let requests = await ParticipationRequest.aggregate(aggregateArray)
  let subscribedTournaments = requests.map(x => x.tournamentId)
  if (req.query.subscribed) {
    filter._id = { $in: subscribedTournaments }
  }

  let tournaments = await Tournament.find(filter)
    .sort('-date')
    .skip(num * size)
    .limit(size)

  subscribedTournaments = subscribedTournaments.map(x => x.toString())
  
  return ok(tournaments.map(t => tournamentDto(t, req.userId, subscribedTournaments.includes(t._id.toString()))))
}

exports.getTournamentById = async function (req) {
  let tournament = await Tournament.findById(req.params.id);
  if (!tournament) {
    return notFound(tournamentNotFound(req.params.id))
  }
  return ok(tournamentDto(tournament, req.userId, await isSubscribed(req.userId, tournament)))
}

exports.updateTournament = async function (req) {
  let updatedTournament = await Tournament.findById(req.params.id)
  if (!updatedTournament) {
    return notFound(tournamentNotFound(req.params.id))
  }
  if (!updatedTournament.owners.includes(req.userId)) {
    return forbidden()
  }
  if (updatedTournament.status == 'ACTIVE') {
    return forbidden(tournamentNotAllowed(req.params.id))
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

  return ok(tournamentDto(updatedTournament, req.userId, await isSubscribed(req.userId, updatedTournament)))
}

exports.removeTournament = async function (req) {
  let deletedTournament = await Tournament.findByIdAndRemove(req.params.id)
  if (!deletedTournament) {
    return notFound(tournamentNotFound(req.params.id))
  }
  return ok(tournamentDto(deletedTournament, req.userId, false))
}


