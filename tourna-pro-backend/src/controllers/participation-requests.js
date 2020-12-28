const { ParticipationRequests } = require('../models')
const { ok, created, notFound } = require('../utils/action-results')

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

exports.addParticipationRequest = async function (req) {
  let participationRequestModel = new ParticipationRequest({
    type: req.body.type,
    person: {
      firstName: req.body.firstName,
      lastName: req.body.lastName
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
  let deleteParticipationRequest = await ParticipationRequest.findeByIdAndRemove(req.params.requestId)
  if (!deleteParticipationRequest) {
    return notFound(requestNotFound(req.params.id, req.params.requestId))
  }
  return ok(participationRequestsDto(deleteParticipationRequest))
}

exports.updateParticipationRequest = async function (req) {

}

