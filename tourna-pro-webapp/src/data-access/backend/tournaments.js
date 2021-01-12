import http from './http'

export default {
  create: tournament => http.post(`/tournaments`, tournament),
  getAll: filters => http.get(`/tournaments`, filters),
  get: id => http.get(`/tournaments${id}`),
  update: (id, tournament) => http.put(`tournaments/${id}`, tournament),
  delete: id => http.delete(`tournaments/${id}`)
}
