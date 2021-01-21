import http from './http'

export default {
  getUnreadNotifications: (id) => http.get(`/users/${id}/logs/unread`),
  getUserNotifications: (id, pageNum) => http.get(`/users/${id}/logs`, { pageNum }),
  getTeamLogs: (id, pageNum) => http.get(`/teams/${id}/logs`, { pageNum }),
  getTournamentLogs: (id, pageNum) => http.get(`/tournaments/${id}/logs`, { pageNum }),
  markAsRead: (userId, logId) => http.put(`/users/${userId}/logs/${logId}/read`)
}
