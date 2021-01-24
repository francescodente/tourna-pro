const { ParticipationRequest, Tournament, Team } = require('../models');
const { isIndividual, isTeam } = require('../models/tournament-modes');
const { ok, created, notFound, badRequest, forbidden } = require('../utils/action-results')

const mongoose = require('mongoose');

function participationRequestsDto(participationRequest) {
  return {
    id: participationRequest._id,
    type: participationRequest.type,
    participant: participationRequest.participant,
    userId: participationRequest.userId,
    teamId: participationRequest.teamId,
    status: participationRequest.status
  };
}
function tournamentNotFound(id) {
  return `Could not find tournament with id ${id}`
}

function teamNotFound(id) {
  return `Could not find team with id ${id}`
}

function requestNotFound(id, reqId) {
  return `Could not find request with id ${reqId} for tournament with id ${id}`
}

function forbiddenModeMessage(id, mode) {
  return `Participant is not allowed for tournament ${id} that is for ${mode}`
}

exports.addParticipationRequest = async function (req) {
  let tournament = await Tournament.findById(req.params.id)
  if (!tournament) {
    tournamentNotFound(req.params.id)
  }
  let target = {}
  switch (req.body.type) {
    case 'PARTICIPANT':
      if (!req.body.participant) {
        return badRequest("Participant not defined")
      }
      if (!tournament.owners.includes(req.userId)) {
        return forbidden("Only tournament owners can add anonymous participants to a tournament")
      }
      target.participant = {
        name: req.body.participant.name,
        telephone: req.body.participant.telephone
      }
      break;
    case 'USER':
      if (!req.body.userId) {
        return badRequest("UserId not defined")
      }
      if (!isIndividual(tournament.mode)) {
        return badRequest(forbiddenModeMessage(req.params.id, tournament.mode))
      }
      if (req.body.userId != req.userId) {
        return forbidden("Can not make a participation request for a user different from self")
      }
      target.userId = req.body.userId
      break;
    case 'TEAM':
      if (!req.body.teamId) {
        return badRequest("TeamId not defined")
      }
      if (!isTeam(tournament.mode)) {
        return badRequest(forbiddenModeMessage(req.params.id, tournament.mode))
      }
      let team = await Team.findById(req.body.teamId)
      if (!team) {
        return notFound(teamNotFound(req.body.teamId))
      }
      if (!team.members.includes(req.userId)) {
        return forbidden("Can not make a participation request for a team the user is not member of")
      }
      target.teamId = req.body.teamId
      break;
    default: return badRequest("Unsupported type")
  }
  let participationRequestModel = new ParticipationRequest({
    type: req.body.type,
    ...target,
    tournamentId: req.params.id,
    status: 'PENDING'
  })
  let tournamentRequest = await participationRequestModel.save()
  return created(participationRequestsDto(tournamentRequest))
}

exports.getAllParticipationRequests = async function (req) {
  let requests = null
  let matchObject = {
    $match: {}
  }
  let aggregateArray = [];
  if (req.query.userId) {
    let lookupTeams = {
      $lookup: {
        from: 'Teams',
        localField: 'teamId',
        foreignField: '_id',
        as: 'team'
      }
    }
    aggregateArray.push(lookupTeams)
    matchObject.$match.$or = [
      { userId: mongoose.Types.ObjectId(req.query.userId) },
      { 'team.members': mongoose.Types.ObjectId(req.query.userId) }
    ]
  }
  if (req.query.tournamentId) {
    matchObject.$match.tournamentId = mongoose.Types.ObjectId(req.query.tournamentId)
  }
  if (req.query.status) {
    matchObject.$match.status = req.query.status
  }
  aggregateArray.push(matchObject)
  requests = await ParticipationRequest.aggregate(aggregateArray)
  if (!requests) {
    return notFound(tournamentNotFound(req.params.id))
  }
  return ok(requests.map(x => participationRequestsDto(x)))
}

exports.removeParticipationRequest = async function (req) {
  let participationRequest = await ParticipationRequest.findById(req.params.requestId)
  if (!participationRequest) {
    return notFound(requestNotFound(req.params.id, req.params.requestId))
  }
  if (participationRequest.status == 'APPROVED') {
    return forbidden("Can not remove a request that has been approved retire your participation instead")
  }
  switch (participationRequest.type) {
    case 'PARTICIPANT':
      let tournament = await Tournament.findById(req.params.id)
      if (!tournament.owners.include(req.userId)) {
        return forbidden("Only tournament owners can remove people from a tournament")
      }
      break;
    case 'USER':
      if (participationRequest.userId != req.userId) {
        return forbidden("Can not delete a participation request for a user different from self")
      }
      break;
    case 'TEAM':
      let team = await Team.findById(participationRequest.teamId)
      if (!team.members.include(req.userId)) {
        return forbidden("Can not delete a participation request for a team the user is not member of")
      }
      break;
    default: break;
  }
  let deleteParticipationRequest = await ParticipationRequest.findByIdAndRemove(req.params.requestId)
  return ok(participationRequestsDto(deleteParticipationRequest))
}

exports.updateParticipationRequestStatus = async function (req) {
  let tournament = await Tournament.findById(req.params.id)
  if (!tournament.owners.includes(req.userId)) {
    return forbidden("Only tournament owners can update participation request status")
  }
  let participationRequest = await ParticipationRequest.findById(req.params.requestId)
  if (!participationRequest) {
    return notFound(requestNotFound(req.params.id, req.params.requestId))
  }
  if (req.body.status == 'PENDING') {
    return forbidden("Can not change the value to pending");
  }
  if (['REJECTED', 'APPROVED'].includes(req.body.status) && participationRequest.status != 'PENDING') {
    return forbidden("Can not change the value to a confirmed or rejected request");
  }
  participationRequest.status = req.body.status
  await participationRequest.save()

  if (req.body.status == 'APPROVED') {
    tournament.participants.push({
      id: participationRequest._id,
      status: 'ACTIVE'
    })
    await tournament.save()
  }

  return ok(participationRequestsDto(participationRequest))
}

exports.getByUser = async function (req) {

}

