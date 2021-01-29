const values = [
  {
    id: "LUPO_SOLITARIO",
    name: "Lupo Solitario",
    description: "Partecipa ad un torneo in modalità singolo.",
    image: "wolf.png"
  },
  {
    id: "GIOCO_DI_SQUADRA",
    name: "Gioco di squadra",
    description: "Partecipa ad un torneo in modalità squadre.",
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
  {
    id: "BUONI_AMICI",
    name: "Buoni amici",
    description: "Entra in una squadra esistente",
    image: ""
  },
  {
    id: "MAESTRO_DEI_GIOCHI",
    name: "Maestro dei giochi",
    description: "Crea il tuo primo torneo",
    image: ""
  },
  {
    id: "PREMIO_DI_CONSOLAZIONE",
    name: "Premio di consolazione",
    description: "Arriva ultimo ad un torneo",
    image: ""
  },
  {
    id: "GOLEADOR",
    name: "Goleador",
    description: "Vinci un torneo di Calcio",
    image: ""
  },
  {
    id: "GRAN_MAESTRO_DEGLI_SCACCHI",
    name: "Gran Maestro degli Scacchi",
    description: "Vinci un torneo di Scacchi",
    image: ""
  },
  {
    id: "PUZZLE_DEL_MILLENNIO",
    name: "Puzzle del Millennio",
    description: "Vinci un torneo di Yu-Gi-Oh!",
    image: ""
  },
  {
    id: "LOTO_NERO",
    name: "Loto Nero",
    description: "Vinci un torneo di Magic The Gathering!",
    image: ""
  },
  {
    id: "CECCHINO_UBRIACONE",
    name: "Cecchino ubriacone",
    description: "Vinci un torneo di Beer-Pong",
    image: ""
  },
  {
    id: "RE_DELLA_SPIAGGIA",
    name: "Re della spiaggia",
    description: "Vinci un torneo di Beach Volley",
    image: ""
  },
  {
    id: "THE_JOKER",
    name: "The Joker",
    description: "Vinci un torneo di Burraco",
    image: ""
  },
  {
    id: "SEI_UN_ASSO",
    name: "Sei un Asso",
    description: "Vinci un torneo di Briscola",
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