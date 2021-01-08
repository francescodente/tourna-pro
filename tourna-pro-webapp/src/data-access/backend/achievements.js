import http from './http'

export default {
  getAll: () => http.get(`/achievements`),
  getByUser: (id) => http.get(`/users/${id}/achievements`)
}
