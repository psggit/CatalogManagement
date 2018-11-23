const logger = store => next => action => {
  console.log('%c prev state', 'color: #9E9E9E', store.getState())
  console.log('%c action', 'color: #03A9F4', action)
  let result = next(action)
  console.log('%c next state', 'color: #4CAF50', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

export default logger
