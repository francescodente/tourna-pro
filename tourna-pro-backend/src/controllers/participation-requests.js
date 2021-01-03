const { ParticipationRequests, Tournament } = require('../models');
const { isIndividual, isTeam } = require('../models/tournament-modes');
const { ok, created, notFound, notAllowed, badRequest, forbidden } = require('../utils/action-results')

function participationRequestsDto(participationRequest, person) {
  return {
    id: participationRequest._id,
    type: participationRequest.type,
    person: person ? {
      firstName: person.firstName,
      lastName: person.lastName
    } : undefined,
    userId: 0,
    teamId: 0,
    status: participationRequest.status
  };
}
function tournamentNotFound(id) {
  return `Could not found tournament with id ${id}`
}

function requestNotFound(id, reqId) {
  return `Could not found request with id ${reqId} for tournament with id ${id}`
}

function forbiddenMessage(id, mode) {
  return `Participant is not allowed for tournament ${id} that is for ${mode}`
}

exports.addParticipationRequest = async function (req) {
  let tournament = await Tournament.findById(req.params.id)
  if (!tournament) {
    tournamentNotFound(req.params.id)
  }
  switch (req.body.type) {
    case 'PERSON':
      if(!req.body.person){
        return badRequest("Person not defined")
      }
      if(!isIndividual(tournament.mode)){
        return forbidden(forbiddenMessage(req.params.id, tournament.mode))
      }
      break;
    case 'USER':
      if(!req.body.userId){
        return badRequest("UserId not defined")
      }
      if(!isIndividual(tournament.mode)){
        return forbidden(forbiddenMessage(req.params.id, tournament.mode))
      }
      break;
    case 'TEAM':
      if(!req.body.teamId){
        return badRequest("TeamId not defined")
      }
      if(!isTeam(tournament.mode)){
        return forbidden(forbiddenMessage(req.params.id, tournament.mode))
      }
      break;
    default: return badRequest("Unsupported type")
  }
  let participationRequestModel = new ParticipationRequest({
    type: req.body.type,
    person: {
      firstName: req.body.person.firstName,
      lastName: req.body.person.lastName
    },
    userId: req.body.userId,
    teamId: req.body.teamId,
    tournamentId: req.params.id
  })
  let tournamentRequest = await participationRequestModel.save()
  return created(participationRequestsDto(tournamentRequest))
}

exports.getAllParticipationRequests = async function (req) {
  let requests = await ParticipationRequests.find().where('tournamentId').equals(req.params.id)
  if (!requests) {
    return notFound(tournamentNotFound(req.params.id))
  }
  return ok(requests)
}

exports.removeParticipationRequest = async function (req) {
  let deleteParticipationRequest = await ParticipationRequest.findByIdAndRemove(req.params.requestId)
  if (!deleteParticipationRequest) {
    return notFound(requestNotFound(req.params.id, req.params.requestId))
  }
  return ok(participationRequestsDto(deleteParticipationRequest))
}

exports.updateParticipationRequest = async function (req) {

}

