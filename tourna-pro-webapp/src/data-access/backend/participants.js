import http from './http'

export default {
  getAll: (id) => http.get(`/tournaments/${id}/participants`),
  delete: (id, participantId) => http.delete(`/tournaments/${id}/participant/${participantId}`)
}
