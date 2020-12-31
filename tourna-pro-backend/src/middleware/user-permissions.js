const { forbidden } = require("../utils/action-results")

module.exports = function(f) {
  return function(req, res, next){
    let checkId = f(req)
    if(req.userId == checkId){
      next()
    } else {
      res.setResult(forbidden())
    }
  }
}