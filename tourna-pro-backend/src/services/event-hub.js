let events = {}

exports.subscribe = function(eventName, handler) {
  if (!events[eventName]) {
    events[eventName] = []
  }
  events[eventName].push(handler)
  let handlerToRemove = handler
  return {
    unsubscribe: () => events[eventName] = events[eventName].filter(x => x !== handlerToRemove)
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
  events[eventName].forEach(h => h(...args))
}
