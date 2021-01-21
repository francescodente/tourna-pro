const { validateToken } = require("./token-service")
const eventBus = require('./event-bus')

async function login(context, token) {
  const result = await validateToken(token)
  if (result.success) {
    context.userId = result.userId
    onUserAuthenticated(context)
  } else {
    context.socket.emit('login_error', result.errorMessage)
  }
}

function onUserAuthenticated(context) {
  console.log(`User with id ${context.userId} connected to notifications service`)
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
  socket.on('disconnect', function () {
    console.log(`user with id ${context.userId} disconnected`)
    subscription.unsubscribe()
  })
}

exports.onStartup = function () {
  eventBus.subscribeAll(require('./notifications-handlers'))
}