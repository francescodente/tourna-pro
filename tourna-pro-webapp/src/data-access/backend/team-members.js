import http from './http'

export default {
  get: (id) => http.get(`/teams/${id}/members`),
  addMember: (id, member) => http.post(`/teams/${id}/members`, member),
  delete: (id, userId) => http.delete(`/teams/${id}/members/${userId}`)
}
