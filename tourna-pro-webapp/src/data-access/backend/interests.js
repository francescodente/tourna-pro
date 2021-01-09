import http from './http'

export default {
  getAll: (id) => http.get(`/users/${id}/interests`),
  update: (id) => http.put(`users/${id}/interests`)
}
