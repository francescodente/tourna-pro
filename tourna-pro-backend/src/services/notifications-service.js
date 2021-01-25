const { validateToken } = require("./token-service")
const eventBus = require('./event-bus')

async function login(context, token) {
  const result = await validateToken(token)
  if (result.success) {
    context.userId = result.userId
    console.log(`User with id ${context.userId} connected to notifications service`)
  } else {
    context.socket.emit('login_error', result.errorMessage)
  }
}

function logout(context) {
  onUserDisconnected(context)
  context.userId = undefined
}

function onUserDisconnected(context) {
  if (context.userId) {
    console.log(`User with id ${context.userId} disconnected from notifications service`)
  }
}

function onNewLog(context, log) {
  if (!context.userId || !log.recipients.includes(context.userId)) {
    return
  }
  context.socket.emit('notification', {
    id: log._id,
    type: log.type,
    parameters: log.parameters,
    teamId: log.teamId,
    tournamentId: log.tournamentId,
    date: log.date
  })
}

exports.onConnection = function (socket) {
  let context = {
    socket
  }
  let subscription = eventBus.subscribe('newLog', log => onNewLog(context, log))
  socket.emit('login')
  socket.on('authenticate', msg => login(context, msg.accessToken))
  socket.on('logout', () => logout(context))
  socket.on('disconnect', function () {
    onUserDisconnected(context)
    subscription.unsubscribe()
  })
}

exports.onStartup = function () {
  eventBus.subscribeAll(require('./notifications-handlers'))
}