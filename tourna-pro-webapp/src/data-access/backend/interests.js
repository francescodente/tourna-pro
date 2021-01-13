import http from './http'

export default {
  getAll: (id) => http.get(`/users/${id}/interests`),
  update: (id, interest) => http.put(`users/${id}/interests`, interest)
}
