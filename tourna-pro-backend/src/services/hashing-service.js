const crypto = require('crypto')

const saltLength = 64
const hashLength = 64
const hashIterations = 967
const hashAlgorithm = 'sha512'

const toHexString = bytes => bytes.toString('hex')

function calculateHash(plainTextPassword, salt) {
  return toHexString(crypto.pbkdf2Sync(plainTextPassword, salt, hashIterations, hashLength, hashAlgorithm))
}

exports.generateHash = function(plainTextPassword) {
  const salt = toHexString(crypto.randomBytes(saltLength))
  const hash = calculateHash(plainTextPassword, salt)
  return { hash, salt }
}

exports.compareHash = function(plainTextPassword, hash, salt) {
  const computedHash = calculateHash(plainTextPassword, salt)
  return computedHash === hash
}