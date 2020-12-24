const mongoose = require('mongoose')
const User = require('../models/user')(mongoose)
const Person = require('../models/person')(mongoose)
const { generateHash } = require('../services/hashing-service')

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
    username: user.username
  }
}

exports.registerUser = async function(req, res) {
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
  res.status(201).json(userDto(user, person))
}

exports.getUser = function(req, res) {
  let user = await User.findById(req.params.id)
  let person = await Person.findById(user.person)
  res.status(200).json(userDto(user, person))
}

exports.modifyUser = function(req, res) {
  
}

exports.setProfilePicture = function(req, res) {

}