const Activities = require("./activities")

const sum = prop => xs => xs.reduce((a, b) => prop(a) + prop(b), 0)

const fromMatches = comparer => calculator => name => {
  return {
    name,
    comparer,
    compute: (tournament, id) => calculator(tournament.matches
      .flat()
      .filter(m => m.participant1.id == id || m.participant2.id == id)
      .map(match => {
        const activity = Activities.findById(tournament.activity)
        return {
          match,
          activity,
          result: activity.getMatchResult(match, tournament),
          thisPlayer: match.participant1.id == id ? 'participant1' : 'participant2',
          otherPlayer: match.participant1.id == id ? 'participant2' : 'participant1'
        }
      }))
  }
}

const bonus = fromMatches((a, b) => a - b)

const malus = fromMatches((a, b) => b - a)

exports.points = bonus(sum(m => m.activity.assignPoints(m.result, m.thisPlayer)))

exports.pointsScored = bonus(sum(m => m.result[m.thisPlayer].score))

exports.pointsTaken = malus(sum(m => m.result[m.otherPlayer].score))

exports.scoreDifference = bonus(sum(m => m.result[m.thisPlayer].score - m.result[m.otherPlayer].score))