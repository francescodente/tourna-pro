const { validateToken } = require("../services/token-service")

async function runValidation(req, token, next) {
  let result = await validateToken(token)
  req.isLoggedIn = result.success
  req.authError = result.errorMessage
  req.userId = result.userId
  next()
}

module.exports = function(req, _, next) {
  let authHeader = req.headers.authorization
  if (!authHeader) {
    req.isLoggedIn = false
    next()
    return
  }
  let authHeaderRegex = /bearer\s+(\S+)/i
  let match = authHeader.match(authHeaderRegex)
  let token = match[1]

  runValidation(req, token, next)
}