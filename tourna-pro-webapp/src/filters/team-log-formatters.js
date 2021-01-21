export default {
  memberAdded(params) {
    return `${params.addedBy.name} ha aggiunto ${params.added.name} alla squadra.`
  },
  memberRemoved(params) {
    if (params.removedBy.id != params.removed.id) {
      return `${params.removedBy.name} ha rimosso ${params.removed.name} dalla squadra.`
    } else {
      return `${params.removed.name} ha abbandonato la squadra`
    }
  }
}