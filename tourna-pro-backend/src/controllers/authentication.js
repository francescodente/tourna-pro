const { User } = require("../models")
const { compareHash, generateHash } = require("../services/hashing-service")
const { generateToken } = require("../services/token-service")
const { badRequest, ok, notFound } = require("../utils/action-results")

function loginFailed() {
  return badRequest('Invalid credentials')
}

const requiredFields = ['_id', 'password', 'salt']

exports.login = async function (req) {
  let user = await User.findOne({
    $or: [
      { username: req.body.identifier },
      { email: req.body.identifier }
    ]
  }, requiredFields)

  if (!user) {
    return loginFailed()
  }

  if (!compareHash(req.body.password, user.password, user.salt)) {
    return loginFailed()
  }

  let accessToken = await generateToken(user)
  return ok({ accessToken, userId: user._id })
}

exports.updatePassword = async function (req) {
  let user = await User.findOneById(req.params.id, requiredFields)
  
  if (!user) {
    return notFound(`Could not find user with id ${req.params.id}`)
  }

  if (!compareHash(req.body.oldPassword, user.password, user.salt)) {
    return badRequest('The old password is incorrect')
  }

  let { hash: newHash, salt: newSalt } = generateHash(req.body.newPassword)
  await user.updateOne({
    password: newHash,
    salt: newSalt
  })

  return ok({ })
}