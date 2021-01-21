export default {
  memberAdded(params) {
    return `${params.addedBy.name} ti ha aggiungto alla squadra ${params.team.name}`
  },
  memberRemoved(params) {
    return `${params.removedBy.name} ti ha rimosso dalla squadra ${params.team.name}`
  }
}

