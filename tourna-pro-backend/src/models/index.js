const mongoose = require('mongoose')

exports.Team = require('./team')(mongoose)
exports.Tournament = require('./tournament')(mongoose)
exports.User = require('./user')(mongoose)
exports.ParticipationRequest = require('./participation-request')(mongoose)
exports.Image = require('./image')(mongoose)
exports.Log = require('./log')(mongoose)