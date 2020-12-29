const { User, Person } = require('../models')
const { generateHash } = require('../services/hashing-service')
const { ok, created, notImplemented, badRequest, notFound } = require('../utils/action-results')

function userDto(user, person) {
  return {
    id: user._id,
    personId: person._id,
    firstName: person.firstName,
    lastName: person.lastName,
    telephone: person.telephone,
    birthDate: person.birthDate,
    gender: person.gender,
    city: person.city,
    email: user.email,
    username: user.username,
    imageUrl: user.imageUrl || null
  }
}

async function usernameOrEmailAlreadyInUse(username, email) {
  return await User.exists({
    $or: [{ email }, { username }]
  })
}

exports.registerUser = async function (req) {
  if (await usernameOrEmailAlreadyInUse(req.body.username, req.body.email)) {
    return badRequest('Username or email already taken')
  }

  let personModel = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    telephone: req.body.telephone,
    birthDate: new Date(req.body.birthDate),
    gender: req.body.gender,
    city: req.body.city
  })
  let person = await personModel.save()

  let { hash, salt } = generateHash(req.body.password)
  let userModel = new User({
    email: req.body.email,
    username: req.body.username,
    password: hash,
    salt: salt,
    person: person._id,
    interests: [],
    unlockedAchievements: []
  })
  let user = await userModel.save()
  return created(userDto(user, person))
}

exports.getUser = async function (req) {
  let user = await User.findById(req.params.id)
  if (!user) {
    return notFound(`Could not find user with id ${req.params.id}`)
  }
  let person = await Person.findById(user.person)
  return ok(userDto(user, person))
}

exports.modifyUser = async function (req) {
  if (await usernameOrEmailAlreadyInUse(req.body.username, req.body.email)) {
    return badRequest('Username or email already taken')
  }

  let updatedUser = await User.findByIdAndUpdate(req.params.id, {
    email: req.body.email,
    username: req.body.username
  }, { new: true })
  let updatedPerson = await Person.findByIdAndUpdate(updatedUser.person, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    telephone: req.body.telephone,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    city: req.body.city
  }, { new: true })

  return ok(userDto(updatedUser, updatedPerson))
}

exports.setProfilePicture = async function (req) {
  return notImplemented()
}