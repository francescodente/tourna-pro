const mongoose = require('mongoose')

exports.matchBetween = function(a, b) {
  return {
    id: mongoose.Types.ObjectId(),
    participant1: { id: a.id },
    participant2: { id: b.id },
    status: 'PENDING'
  }
}

exports.shuffle = function(array) {
  let copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy
}