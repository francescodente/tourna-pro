const { unauthorized } = require("../utils/action-results")

module.exports = function(req, res, next) {
  if (req.isLoggedIn) {
    next()
  } else {
    res.setResult(unauthorized())
  }
}