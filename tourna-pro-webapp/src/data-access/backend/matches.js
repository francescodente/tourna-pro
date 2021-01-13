import http from './http'

export default {
  getAll: id => http.get(`/tournaments/${id}/matches`),
  update: (id, matchId, matchResult) => http.put(`/tournaments/${id}/matches/${matchId}`, matchResult),
  lockMatches: (id, matches) => http.put(`/tournaments/${id}/matches`, matches)
}
