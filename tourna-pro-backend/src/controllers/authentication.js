const { User } = require("../models")
const { compareHash } = require("../services/hashing-service")
const { generateToken } = require("../services/token-service")
const { badRequest, ok } = require("../utils/action-results")

function loginFailed() {
  return badRequest('Invalid credentials')
}

exports.login = async function (req) {
  let user = await User.findOne({
    $or: [
      { username: req.body.identifier },
      { email: req.body.identifier }
    ]
  }, ['_id', 'password', 'salt'])

  if (!user) {
    return loginFailed()
  }

  if (!compareHash(req.body.password, user.password, user.salt)) {
    return loginFailed()
  }

  let accessToken = await generateToken(user)
  return ok({ accessToken })
}

exports.updatePassword = async function (req) {

}