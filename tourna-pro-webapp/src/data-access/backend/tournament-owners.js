import http from './http'

export default {
  getAll: id => http.get(`/tournaments/${id}/owners`),
  addOwner: (id, owner) => http.post(`/tournaments/${id}/owners`, owner),
  delete: (id, userId) => http.delete(`/tournaments/${id}/owners/${userId}`)
}
