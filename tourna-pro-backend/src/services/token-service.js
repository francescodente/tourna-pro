const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'JWT_SECRET'
const tokenDuration = process.env.JWT_DURATION || '30d'

exports.generateToken = function(user) {
  return new Promise(function(resolve, reject) {
    const jwtPayload = {
      uid: user._id
    }
    const jwtOptions = {
      expiresIn: tokenDuration,
      algorithm: 'HS256'
    }
    jwt.sign(jwtPayload, secret, jwtOptions, function(err, token) {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

exports.validateToken = function(token) {
  return new Promise(function(resolve, reject) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        resolve({
          success: false,
          errorMessage: err.message
        })
      } else {
        resolve({
          success: true,
          userId: decoded.uid
        })
      }
    })
  })
}