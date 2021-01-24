import http from './http'

export default {
  getAll: id => http.get(`/tournaments/${id}/matches`),
  update: (id, matchId, matchResult) => http.put(`/tournaments/${id}/matches/${matchId}`, matchResult),
  startRound: (id) => http.put(`/tournaments/${id}/matches`),
  startMatch: (id, matchId) => http.put(`/tournaments/${id}/matches/${matchId}`)
}
