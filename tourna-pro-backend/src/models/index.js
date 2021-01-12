const mongoose = require('mongoose')

exports.Person = require('./person')(mongoose)
exports.Team = require('./team')(mongoose)
exports.Tournament = require('./tournament')(mongoose)
exports.User = require('./user')(mongoose)
exports.ParticipationRequest = require('./participation-request')(mongoose)
exports.Image = require('./image')(mongoose)