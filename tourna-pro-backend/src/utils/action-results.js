exports.ok = function(body) {
  return {
    body,
    status: 200
  }
}

exports.created = function(body) {
  return {
    body,
    status: 201
  }
}

exports.notImplemented = function() {
  return {
    status: 500,
    body: {
      error: 'Not implemented'
    }
  }
}