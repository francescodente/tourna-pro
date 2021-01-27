import http from './http'

export default {
  create: team => http.post(`/teams`, team),
  get: id => http.get(`/teams/${id}`),
  getAll: filters => http.get(`/teams`, filters),
  update: (id, team) => http.put(`/teams/${id}`, team),
  delete: id => http.delete(`teams/${id}`),
  updateImage: (id, image) => {
    let formData = new FormData();
    formData.append("team_picture", image);
    http.put(`/teams/${id}/image`, formData)
  }
}
