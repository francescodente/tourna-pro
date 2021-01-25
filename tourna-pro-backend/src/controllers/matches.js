const { Tournament } = require('../models')
const { notFound, badRequest, ok, forbidden } = require('../utils/action-results')
const { publish } = require('../services/event-bus')
const TournamentTypes = require('../models/tournament-types')
const Activities = require('../models/activities')

function matchDto(match, tournament, activity) {
  activity = activity || Activities.findById(tournament.activity)
  return {
    id: match._id,
    participant1: match.participant1.id,
    participant2: match.participant2.id,
    result: activity.getMatchResult(match, tournament),
    notes: match.notes,
    status: match.status,
    date: match.date
  }
}

function roundsDto(tournament, activity) {
  return tournament.matches.map(x => x.map(m => matchDto(m, tournament, activity)))
}

function participantDto(participant) {
  return {
    id: participant.id,
    status: participant.status
  }
}

function tournamentDto(tournament) {
  let activity = Activities.findById(tournament.activity)
  return {
    id: tournament._id,
    status: tournament.status,
    type: tournament.type,
    rounds: roundsDto(tournament, activity),
    participants: tournament.participants.map(x => participantDto(x))
  }
}

function canUpdate(tournament, req) {
  return tournament.owners.includes(req.userId)
}

function forbidUpdate() {
  return forbidden('Only tournament owners can update tournament related information')
}

function tournamentNotFound(id) {
  return notFound(`Unable to find tournament with id ${id}`)
}

exports.getAllMatchesByTournament = async function (req) {
  let tournament = await Tournament.findById(req.params.id)
  if (!tournament) {
    return tournamentNotFound(req.params.id)
  }
  return ok(tournamentDto(tournament))
}

exports.startMatch = async function (req) {
  let tournament = await Tournament.findById(req.params.id)
  if (!tournament) {
    return tournamentNotFound(req.params.id)
  }
  if (!canUpdate(tournament, req)) {
    return forbidUpdate()
  }
  if (tournament.status != 'ACTIVE') {
    return badRequest('Cannot set results if the tournament has ended')
  }
  let match = tournament.matches[tournament.matches.length - 1].find(x => x._id == req.params.matchId)
  if (!match) {
    return notFound(`Cannot find match with id ${req.params.matchId}`)
  }
  if (match.status != 'PENDING') {
    return badRequest("Cannot start a match that has already been started")
  }
  match.status = 'STARTED'
  await tournament.save()

  publish('matchStarted', tournament, match)
  return ok(matchDto(match, tournament))
}

exports.updateMatchResult = async function (req) {
  let tournament = await Tournament.findById(req.params.id)
  if (!tournament) {
    return tournamentNotFound(req.params.id)
  }
  if (!canUpdate(tournament, req)) {
    return forbidUpdate()
  }
  if (tournament.status != 'ACTIVE') {
    return badRequest('Cannot set results if the tournament has ended')
  }
  let match = tournament.matches[tournament.matches.length - 1].find(x => x._id == req.params.matchId)
  if (!match) {
    return notFound(`Cannot find match with id ${req.params.matchId}`)
  }

  if (match.status != 'STARTED') {
    return badRequest("Cannot update result for a match that hasn't started yet")
  }
  match.participant1.score = req.body.participant1
  match.participant2.score = req.body.participant2
  await tournament.save()

  return ok(matchDto(match, tournament))
}

exports.startNextRound = async function (req) {
  let tournament = await Tournament.findById(req.params.id)
  if (!tournament) {
    return tournamentNotFound(req.params.id)
  }
  if (!canUpdate(tournament, req)) {
    return forbidUpdate()
  }

  let activity = Activities.findById(tournament.activity)
  let lastRound = tournament.matches[tournament.matches.length - 1]
  if (lastRound) {
    if (lastRound.some(m => activity.getMatchResult(m, tournament) == null)) {
      return badRequest('Cannot proceed to next round if any match of the previous one is missing its result')
    }
    lastRound.forEach(m => {
      m.status = "ENDED"
      publish('matchEnded', tournament, m)
    })
  } else {
    if (tournament.participants.length <= 1) {
      return badRequest('Cannot start a tournament with less than 2 participants')
    }
  }

  let tournamentType = TournamentTypes.findById(tournament.type)
  if (tournament.matches.length == tournamentType.getRoundCount(tournament)) {
    if (tournament.status == 'ENDED') {
      return badRequest('This tournament has already ended')
    }
    tournament.status = 'ENDED'
    await tournament.save()
    publish('tournamentEnded', tournament)
    return ok(tournamentDto(tournament))
  }

  let newRound = tournamentType.generateNewRound(tournament)
  tournament.matches.push(newRound)

  let justStarted = false
  if (tournament.status == "PENDING") {
    tournament.status = "ACTIVE"
    justStarted = true
  }

  await tournament.save()

  if (justStarted) {
    publish('tournamentStarted', tournament)
  }
  publish('roundStarted', tournament)

  return ok(tournamentDto(tournament))
}
