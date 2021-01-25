const Activities = require("./activities")

const sum = prop => xs => xs.map(prop).reduce((a, b) => a + b, 0)

const matchContext = (tournament, id) => match => {
  const activity = Activities.findById(tournament.activity)
  return {
    match,
    activity,
    result: activity.getMatchResult(match, tournament),
    thisPlayer: match.participant1.id.toString() == id.toString() ? 'participant1' : 'participant2',
    otherPlayer: match.participant1.id.toString() == id.toString() ? 'participant2' : 'participant1'
  }
}

const containsParticipant = id => match =>
  match.participant1.id.toString() == id.toString() ||
  match.participant2.id.toString() == id.toString()

const fromMatches = compare => calculator => key => name => ({
  name,
  key,
  compare,
  compute(tournament, id) {
    let participantMatches = tournament.matches
      .flat()
      .filter(containsParticipant(id))
      .map(matchContext(tournament, id))
      .filter(m => m.result != null)
    return calculator(participantMatches)
  }
})

const bonus = fromMatches((a, b) => a - b)

const malus = fromMatches((a, b) => b - a)

const even = fromMatches(() => 0)

exports.points = bonus(sum(m => m.activity.assignPoints(m.result, m.thisPlayer)))('P')

exports.pointsScored = bonus(sum(m => m.result[m.thisPlayer].score))('PS')

exports.pointsTaken = malus(sum(m => m.result[m.otherPlayer].score))('PT')

exports.scoreDifference = bonus(sum(m => m.result[m.thisPlayer].score - m.result[m.otherPlayer].score))('SD')

exports.wins = bonus(sum(m => m.result.winner == m.thisPlayer ? 1 : 0))('W')

exports.losses = bonus(sum(m => m.result.loser == m.thisPlayer ? 1 : 0))('L')

exports.draws = even(sum(m => m.result.outcome == 'draw'))('D')