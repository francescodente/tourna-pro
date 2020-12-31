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

exports.unauthorized = function() {
  return {
    status: 401,
    body: {
      error: 'User is not authenticated'
    }
  }
}

exports.forbidden = function() {
  return {
    status: 403,
    body: {
      error: 'User is not authorized to perform this action'
    }
  }
}

exports.notFound = function(error) {
  return {
    body: { error },
    status: 404
  }
}

exports.notAllowed = function(error) {
  return {
    body: { error },
    status: 404
  }
}

exports.internalServerError = function(error) {
  return {
    status: 500,
    body: {
      error
    }
  }
}

exports.notImplemented = function() {
  return {
    status: 501,
    body: {
      error: 'Not implemented'
    }
  }
}