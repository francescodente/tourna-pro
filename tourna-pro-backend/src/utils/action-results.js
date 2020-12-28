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

exports.badRequest = function(error) {
  return {
    body: { error },
    status: 400
  }
}

exports.notFound = function(error) {
  return {
    body: { error },
    status: 404
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