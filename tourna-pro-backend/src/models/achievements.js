const values = [
  {
    id: "LUPO_SOLITARIO",
    name: "Lupo Solitario",
    description: "Partecipa ad un torneo in modalità singolo.",
    image: ""
  },
  {
    id: "AND_THE_WINNER_IS",
    name: "And the winner is...",
    description: "Vinci il tuo primo torneo!",
    image: ""
  },
  {
    id: "L_UNIONE_FA_LA_FORZA",
    name: "L'unione fa la forza",
    description: "Crea una squadra",
    image: ""
  },

]

exports.achievementExists = function (achievement) {
  return values.map(x => x.id).includes(achievement)
}

exports.findById = function (id) {
  return values.find(x => x.id == id)
}

exports.achievements = values