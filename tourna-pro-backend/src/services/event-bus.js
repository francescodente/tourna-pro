let events = {}

exports.subscribe = function(eventName, handler) {
  if (!events[eventName]) {
    events[eventName] = []
  }

  let handlerObject = { handle: handler }
  events[eventName].push(handlerObject)
  console.log(`Subscribing to event ${eventName}`)
  return {
    unsubscribe: () => {
      console.log(`Unsubscribing to event ${eventName}`)
      events[eventName] = events[eventName].filter(x => x !== handlerObject)
    }
  }
}

exports.subscribeAll = function(handlers) {
  let subscriptions = Object.entries(handlers)
    .map(([key, value]) => exports.subscribe(key, value))

  return {
    unsubscribe: () => subscriptions.forEach(s => s.unsubscribe())
  }
}

exports.publish = function(eventName, ...args) {
  if (!events[eventName]) {
    return
  }
  console.log(`Publishing event ${eventName} with ${events[eventName].length} subscribers`)
  events[eventName].forEach(h => h.handle(...args))
}
