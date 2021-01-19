import http from './http'

export default {
  add: (id, request) => http.post(`/tournaments/${id}/requests`, request),
  getAll: id => http.get(`/tournaments/${id}/requests`),
  update: (id, requestId, request) => http.post(`/tournaments/${id}/requests/${requestId}/status`, request),
  delete: (id, participantId) => http.delete(`/tournaments/${id}/participant/${participantId}`)
}
