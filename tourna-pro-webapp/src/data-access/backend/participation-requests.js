import http from './http'

export default {
  add: (id, request) => http.post(`/tournaments/${id}/requests`, request),
  getAll: (id, filters) => http.get(`/tournaments/${id}/requests`, filters),
  update: (id, requestId, request) => http.post(`/tournaments/${id}/requests/${requestId}/status`, request),
  delete: (id, requestId) => http.delete(`/tournaments/${id}/requests/${requestId}`)
}
