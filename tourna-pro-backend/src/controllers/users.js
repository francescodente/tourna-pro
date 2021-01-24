const { User } = require('../models')
const { generateHash } = require('../services/hashing-service')
const { ok, created, badRequest, notFound } = require('../utils/action-results')
const { setImage, imageUrl } = require('./image-utils')

const mongoose = require('mongoose');

const defaultPageSize = 30

function userDto(user, req) {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    telephone: user.telephone,
    birthDate: user.birthDate,
    gender: user.gender,
    city: user.city,
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

  let { hash, salt } = generateHash(req.body.password)
  let userModel = new User({
    email: req.body.email,
    username: req.body.username,
    password: hash,
    salt: salt,
    interests: req.body.interests,
    unlockedAchievements: [],
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    telephone: req.body.telephone,
    birthDate: new Date(req.body.birthDate),
    gender: req.body.gender,
    city: req.body.city
  })
  let user = await userModel.save()
  return created(userDto(user, req))
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
      idFilters.push({ _id: { $in: JSON.parse(req.query.userIds) } })
    }
    if (req.query.exclude) {
      idFilters.push({ _id: { $nin: JSON.parse(req.query.exclude) } })
    }
    filter.$and = idFilters
  }

  let users = await User.find(filter)
    .sort('username')
    .skip(num * size)
    .limit(size)

  return ok(users.map(x => userDto(x, req)))
}

exports.getUser = async function (req) {
  let user = await User.findById(req.params.id)
  if (!user) {
    return userNotFound(req.params.id)
  }
  return ok(userDto(user, req))
}

exports.modifyUser = async function (req) {
  if (await usernameOrEmailAlreadyInUse(req.body.username, req.body.email, req.params.id)) {
    return badRequest('Username or email already taken')
  }

  let updatedUser = await User.findByIdAndUpdate(req.params.id, {
    email: req.body.email,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    telephone: req.body.telephone,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    city: req.body.city
  }, { new: true })

  if (!updatedUser) {
    return userNotFound(req.params.id)
  }

  return ok(userDto(updatedUser, req))
}

exports.setProfilePicture = async function (req) {
  let user = await User.findById(req.params.id)
  if (!user) {
    return userNotFound(req.params.id)
  }
  return await setImage(req.file, user, req)
}