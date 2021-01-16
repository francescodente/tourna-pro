import http from './http'

export default {
  register: (user) => http.post(`/users`,user),
  getUser: (id) => http.get(`/users/${id}`),
  updateUser: (id, user) => http.put(`/users/${id}`, user),
  updateImage: (id) => http.put(`/users/${id}/image`),
  search: (query) => http.get(`/users`, query)
}
