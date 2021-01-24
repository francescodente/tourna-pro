import http from './http'

export default {
  add: (id, request) => http.post(`/tournaments/${id}/requests`, request),
  getAll: (filters) => http.get(`/requests`, filters),
  updateStatus: (id, requestId, status) => http.put(`/tournaments/${id}/requests/${requestId}/status`, {status}),
  delete: (id, requestId) => http.delete(`/tournaments/${id}/requests/${requestId}`)
}
