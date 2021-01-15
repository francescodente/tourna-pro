import store from '..'
import dataAccess from '../../data-access'

const state = {
  tournaments: [],
  personalRequests: [],
  tournamentRequests: {},
  matches: {},
  logs: {}
}

const getters = {
  tournament: state => id => state.tournaments.find(x => x.id == id) || null,
  personalRequests: state => state.personalRequests,
  subscribedTournaments: state => state.tournaments.filter(x => x.subscribed),
  managedTournaments: state => state.tournaments.filter(x => x.owned),
  tournamentMatches: state => id => state.matches[id] || [],
  tournamentLogs: state => id => state.logs[id] || [],
  tournamentRequests: state => id => state.tournamentRequests[id] || []
}

const actions = {
  async fetchTournament({ state, commit }, id) {
    let tournament = state.tournaments.find(x => x.id == id)
    if (!tournament) {
      tournament = await dataAccess.tournaments.get(id)
    }
    commit('addTournament', tournament)
  },
  async fetchTournaments({ commit }) {
    let subscribedTournaments = await dataAccess.tournaments.getAll({ subscribed: true })
    let managedTournaments = await dataAccess.tournaments.getAll({ owned: true })
    let subscribed = subscribedTournaments
    let managed = managedTournaments
    commit('setTournaments', subscribed.concat(managed))
  },
  async subscribeToTournament({ commit }, tournamentId) {
    let request = {} //TODO replace with endpoint
    commit('addPersonalSubscriptionRequest', request)
  },
  async retireFromTournament({ commit }, tournamentId) {
    //TODO retire participant
    commit('removeSubscribedTournament', tournamentId)
  },
  async createTournament({ commit }) {
    let createdTournament = {} //TODO replace with endpoint
    commit('addManagedTournament', createdTournament)
  },
  async modifyTournament({ commit }) {
    let modifiedTournament = {} //TODO replace with endpoint
    commit('removeManagedTournament', modifiedTournament)
    commit('addManagedTournament', modifiedTournament)
  },
  async cancelTournament({ commit }) {
    let deletedTournament = {} //TODO replace with endpoint
    commit('removeManagedTournament', deletedTournament)
  },
  async startTournament({ commit }) {

  },

  async fetchTournamentMatches({ commit }) {

  },
  async updateMatch({ commit }) {

  },
  async startMatch({ commit }) {

  },
  async lockMatches({ commit }) {

  },
  async fetchTournamentLogs({ commit }, tournamentId) {

  },

  async fetchPersonalSubscriptionRequests({ commit }) {
    let subscriptionRequests = [] //TODO replace with endpoint
    commit('setPersonalSubscriptionRequests', subscriptionRequests)
  },
  async retireRequestToTournament({ commit }, tournamentId, requestId) {
    let request = {} //TODO replace with endpoint
    commit('removePersonalSubscriptionRequest', requestId)
  },
}

const mutations = {
  addTournament: (state, tournament) => {
    state.tournaments.push(tournament)
  },

  setTournaments: (state, tournaments) => {
    state.tournaments = tournaments
  },

  removeSubscribedTournament: (state, tournamentId) => {
    state.subscribedTournaments = state.subscribedTournaments.filter(t => t.id == tournamentId)
  },

  addManagedTournament: (state, tournament) => state.managedTournaments.push(tournament),

  removeManagedTournament: (state, tournament) => {
    state.managedTournaments = state.managedTournaments.filter(t => t.id == tournament.id)
  },

  setPersonalSubscriptionRequests: (state, requests) => state.personalRequests = requests,

  addPersonalSubscriptionRequest: (state, request) => state.personalRequests.push(request),
}

export default {
  state,
  getters,
  actions,
  mutations
}