const mongoose = require('mongoose')

exports.Activity = require('./activity')(mongoose)
exports.Person = require('./person')(mongoose)
exports.Team = require('./team')(mongoose)
exports.Tournament = require('./tournament')(mongoose)
exports.User = require('./user')(mongoose)
exports.ParticipationRequests = require('./participation-request')(mongoose)