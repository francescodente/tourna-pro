const { Tournament, ParticipationRequest, Team } = require('../models')
const { publish } = require('../services/event-bus')
const { ok, notFound, forbidden, badRequest } = require('../utils/action-results')

function tournamentNotFound(id) {
  return `Could not found tournament with id ${id}`
}

function participantNotFound(id, tournamentId) {
  return `Could not found participant with id ${id} in tournament with id ${tournamentId}`
}

function participantDto(participant) {
  return participant
}


exports.getParticipants = async function (req) {
  let participants = await Tournament.findById(req.params.id).select('participants');
  if (!participants) {
    return notFound(tournamentNotFound(req.params.id))
  }
  return ok(participants.map(x => participantDto(x)))
}

async function validRetireRequest(request, userId, tournament) {
  switch (request.mode) {
    case 'PERSON':
      return tournament.owners.include(userId)
    case 'USER':
      return request.userId == userId;
    case 'TEAM':
      let team = await Team.findById(request.teamId)
      return team.members.include(userId)
    default: return false;
  }
}

exports.retireParticipant = async function (req) {
  let tournament = await Tournament.findById(req.params.id)
  if (!tournament) {
    return notFound(tournamentNotFound(req.params.id))
  }
  let participationRequest = await ParticipationRequest.findById(req.params.participantId)
  if (!participationRequest) {
    return notFound(participantNotFound(req.params.participantId, req.params.id))
  }
  if (!await validRetireRequest(participationRequest, req.userId, tournament)) {
    return forbidden(`User ${req.userId} can not retire participant ${req.params.participantId}`)
  }
  switch (tournament.status) {
    case 'PENDING':
      let deleted = tournament.participants.find(p => p.id == req.params.participantId)
      if (!deleted) {
        return notFound(participantNotFound(req.params.participantId, req.params.id))
      }
      tournament.participants.remove({ id: req.params.participantId })
      await tournament.save()
      await ParticipationRequests.findByIdAndRemove(req.params.participantId)
      publish('participantRetired', req.params.participantId, tournament)
      return ok(participantDto(deleted))
    case 'ACTIVE':
      console.log(tournament.participants)
      let toRetire = tournament.participants.find(p => p.id == req.params.participantId)
      if (!toRetire) {
        return notFound(participantNotFound(req.params.participantId, req.params.id))
      }
      toRetire["status"] = 'RETIRED'
      await tournament.save()
      publish('participantRetired', req.params.participantId, tournament)
      return ok(participantDto(toRetire))
    default:
      return badRequest(`Tournament with id ${req.params.id} is in a state where you can no more retire`);
  }
}