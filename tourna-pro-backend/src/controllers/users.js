const { User, Person } = require('../models')
const { generateHash } = require('../services/hashing-service')
const { ok, created, badRequest, notFound } = require('../utils/action-results')
const { setImage, imageUrl } = require('./image-utils')

const mongoose = require('mongoose');

const defaultPageSize = 30

function userDto(user, person, req) {
  return {
    id: user._id,
    firstName: person.firstName,
    lastName: person.lastName,
    telephone: person.telephone,
    birthDate: person.birthDate,
    gender: person.gender,
    city: person.city,
    email: user.email,
    username: user.username,
    imageUrl: imageUrl(user.imageId, req)
  }
}

function userNotFound(id) {
  return notFound(`Could not find user with id ${id}`)
}

async function usernameOrEmailAlreadyInUse(username, email, id) {
  let idFilter = id ? { _id: { $ne: id } } : { }
  return await User.exists({
    ...idFilter,
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
    interests: req.body.interests,
    unlockedAchievements: []
  })
  let user = await userModel.save()
  return created(userDto(user, person, req))
}

exports.searchUsers = async function (req) {
  let num = Number(req.query.pageNum || 0)
  let size = Number(req.query.pageSize || defaultPageSize)
  let filter = {}
  if (req.query.username) {
    filter.username = { $regex: req.query.username, $options: 'i' }
  }
  if (req.query.userIds || req.query.exclude) {
    let idFilters = []
    if (req.query.userIds) {
      idFilters.push({ _id: { $in: JSON.parse(req.query.userIds).map(x => mongoose.Types.ObjectId(x)) } })
    }
    if (req.query.exclude) {
      idFilters.push({ _id: { $nin: JSON.parse(req.query.exclude).map(x => mongoose.Types.ObjectId(x)) } })
    }
    filter.$and = idFilters
  }
  let users = await User.aggregate([
    { $match: filter },
    { $sort: { username: 1 } },
    { $skip: num * size },
    { $limit: size },
    {
      $lookup: {
        from: 'People',
        localField: 'person',
        foreignField: '_id',
        as: 'personObject'
      }
    }
  ])

  return ok(users.map(x => userDto(x, x.personObject[0], req)))
}

exports.getUser = async function (req) {
  let user = await User.findById(req.params.id)
  if (!user) {
    return userNotFound(req.params.id)
  }
  let person = await Person.findById(user.person)
  return ok(userDto(user, person, req))
}

exports.modifyUser = async function (req) {
  if (await usernameOrEmailAlreadyInUse(req.body.username, req.body.email, req.params.id)) {
    return badRequest('Username or email already taken')
  }

  let updatedUser = await User.findByIdAndUpdate(req.params.id, {
    email: req.body.email,
    username: req.body.username
  }, { new: true })

  if (!updatedUser) {
    return userNotFound(req.params.id)
  }

  let updatedPerson = await Person.findByIdAndUpdate(updatedUser.person, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    telephone: req.body.telephone,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    city: req.body.city
  }, { new: true })

  return ok(userDto(updatedUser, updatedPerson, req))
}

exports.setProfilePicture = async function (req) {
  let user = await User.findById(req.params.id)
  if (!user) {
    return userNotFound(req.params.id)
  }
  return await setImage(req.file, user, req)
}