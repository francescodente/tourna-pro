export default {
  findParticipantName(participants, id) {
    if (!id) {
      return 'BYE'
    }
    let request = participants.requests.find(r => r.id == id)
    if (request.teamId) {
      return participants.teams.find(t => t.id == request.teamId)
    } else if (request.userId) {
      return participants.users.find(u => u.id == request.userId)
    } else {
      return request.participant.name
    }
  }
}