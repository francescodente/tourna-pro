import http from './http'

export default {
  getTournamentRanking: (id) => http.get(`tournaments/${id}/ranking`)
}
