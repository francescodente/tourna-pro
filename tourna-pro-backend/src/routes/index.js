module.exports = function(app) {
  require('./users')(app)
  require('./achievements')(app)
  require('./activities')(app)
  require('./authentication')(app)
  require('./images')(app)
  require('./interests')(app)
  require('./teams')(app)
  require('./tournament-owners')(app)
  require('./tournaments')(app)
  require('./tournament-types')(app)
  require('./team-members')(app)
  require('./participation-requests')(app)
  require('./participants')(app)
  require('./matches')(app)
  require('./logs')(app)
  require('./rankings')(app)
}