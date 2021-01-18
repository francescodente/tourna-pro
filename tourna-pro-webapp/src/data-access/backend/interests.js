import http from './http'

export default {
  getAll: (id) => http.get(`/users/${id}/interests`),
  update: (id, interests) => http.put(`users/${id}/interests`, {interests})
}
