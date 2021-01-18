const { ParticipationRequest, Tournament, Team } = require('../models');
const { isIndividual, isTeam } = require('../models/tournament-modes');
const { ok, created, notFound, badRequest, forbidden } = require('../utils/action-results')

function participationRequestsDto(participationRequest, person) {
  return {
    id: participationRequest._id,
    type: participationRequest.type,
    person: person ? {
      firstName: person.firstName,
      lastName: person.lastName
    } : undefined,
    userId: participationRequest.userId,
    teamId: participationRequest.teamId,
    status: participationRequest.status
  };
}
function tournamentNotFound(id) {
  return `Could not found tournament with id ${id}`
}

function teamNotFound(id) {
  return `Could not found team with id ${id}`
}

function requestNotFound(id, reqId) {
  return `Could not found request with id ${reqId} for tournament with id ${id}`
}

function forbiddenModeMessage(id, mode) {
  return `Participant is not allowed for tournament ${id} that is for ${mode}`
}

exports.addParticipationRequest = async function (req) {
  let tournament = await Tournament.findById(req.params.id)
  if (!tournament) {
    tournamentNotFound(req.params.id)
  }
  switch (req.body.type) {
    case 'PERSON':
      if (!req.body.person) {
        return badRequest("Person not defined")
      }
      if (!isIndividual(tournament.mode)) {
        return forbidden(forbiddenModeMessage(req.params.id, tournament.mode))
      }
      if (!tournament.owners.include(req.userId)) {
        return forbidden("Only tournament owners can add people to a tournament")
      }
      break;
    case 'USER':
      if (!req.body.userId) {
        return badRequest("UserId not defined")
      }
      if (!isIndividual(tournament.mode)) {
        return forbidden(forbiddenModeMessage(req.params.id, tournament.mode))
      }
      if (req.body.userId != req.userId) {
        return forbidden("Can not make a participation request for a user different from self")
      }
      break;
    case 'TEAM':
      if (!req.body.teamId) {
        return badRequest("TeamId not defined")
      }
      if (!isTeam(tournament.mode)) {
        return forbidden(forbiddenModeMessage(req.params.id, tournament.mode))
      }
      let team = await Team.findById(req.body.teamId)
      if (!team) {
        return notFound(teamNotFound(req.body.teamId))
      }
      if (!team.members.includes(req.userId)) {
        return forbidden("Can not make a participation request for a team the user is not member of")
      }
      break;
    default: return badRequest("Unsupported type")
  }
  let participationRequestModel = new ParticipationRequest({
    type: req.body.type,
    person: req.body.person,
    userId: req.body.userId,
    teamId: req.body.teamId,
    tournamentId: req.params.id,
    status: 'PENDING'
  })
  let tournamentRequest = await participationRequestModel.save()
  return created(participationRequestsDto(tournamentRequest))
}

exports.getAllParticipationRequests = async function (req) {
  let requests = await ParticipationRequest.find().where('tournamentId').equals(req.params.id)
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
  if(participationRequest.status == 'APPROVED') {
    return forbidden("Can not remove a request that has been approved retire your participation instead")
  }
  switch (participationRequest.type) {
    case 'PERSON':
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
  if(!participationRequest){
    return notFound(requestNotFound(req.params.id, req.params.requestId))
  }
  if(req.body.status == 'PENDING'){
    return forbidden("Can not change the value to pending");
  }
  if(['REJECTED','APPROVED'].includes(req.body.status) && participationRequest.status != 'PENDING'){
    return forbidden("Can not change the value to a confirmed or rejected request");
  }
  participationRequest.status = req.body.status
  await participationRequest.save()
  
  if(req.body.status == 'APPROVED'){
    tournament.participants.push({
      id: participationRequest._id,
      status: 'ACTIVE'
    })
    await tournament.save()
  }

  return ok(participationRequestsDto(participationRequest))
}

