import http from './http'

export default {
  getAll: id => http.get(`/tournaments/${id}/owners`),
  add: (id, userId) => http.post(`/tournaments/${id}/owners`, {userId}),
  remove: (id, userId) => http.delete(`/tournaments/${id}/owners/${userId}`)
}
