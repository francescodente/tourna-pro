import http from './http'

export default {
  register: (user) => http.post(`/users`,user),
  getUser: (id) => http.get(`/users/${id}`),
  updateUser: (id, user) => http.put(`/users/${id}`, user),
  updateImage: (id, image) => {
    let formData = new FormData();
    formData.append("profile_picture", image);
    return http.put(`/users/${id}/image`, formData)
  },
  search: (query) => http.get(`/users`, query)
}
