const { Tournament } = require('../models')
const { ok, created } = require('../utils/action-results')

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

exports.addParticipationRequest = async function (req) {
  let participationRequestModel = new ParticipationRequest({
    type: req.body.type,
    person: {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    },
    userId: req.body.userId,
    teamId: req.body.teamId
  })
  let tournamentRequest = await participationRequestModel.save()
  return created(participationRequestsDto(tournamentRequest))
}

exports.getAllParticipationRequests = async function (req) {
  let requests = await ParticipationRequest.findById(req.params.id).select('requests')
  return ok(requests)
}

exports.removeParticipationRequest = async function (req) {
  let deleteParticipationRequest = await ParticipationRequest.findeByIdAndRemove(req.params.id)
  return ok(participationRequestsDto(deleteParticipationRequest))
}

exports.updateParticipationRequest = async function (req) {

}

