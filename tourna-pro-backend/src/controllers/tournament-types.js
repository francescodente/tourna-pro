const ok = require('../utils/action-results')

exports.getAllTournamentsTypes = function(req) {
    return Promise.resolve(ok(['ROUND_ROBIN', 'KNOCKOUT']))
}