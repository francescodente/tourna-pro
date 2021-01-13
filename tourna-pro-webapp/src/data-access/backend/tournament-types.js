import http from './http'

export default {
  getAll: filters => http.get(`/tournamenttypes`, filters)
}
