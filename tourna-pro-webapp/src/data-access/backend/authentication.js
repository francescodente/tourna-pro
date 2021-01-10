import http from './http'

export default {
  login: (identifier, password) => http.post(`/login`, { 
    identifier: identifier, 
    password: password 
  }),
  changePassword: (userId, oldPassword, newPassword) => http.put(`/users/${userId}/password`, {
    oldPassword: oldPassword, 
    newPassword: newPassword 
  })
}
