import http from './http'

export default {
  register: (user) => http.post(`/users`,user),
  getUser: (id) => http.get(`/users/${id}`),
  updateUser: (id) => http.put(`/users/${id}`),
  updateImage: (id) => http.put(`/users/${id}/image`)
}
