import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./../reducer"
import logger from '@utils/redux-logger'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware, logger),
  )

  if (module.hot) {
    // enable webpack hot module replacement for reducers
    module.hot.accept("./../reducer", () => {
      const nextRootReducer = require("./../reducer").default
      store.replaceReducer(nextRootReducer)
    })
  }

  const storeClone = Object.assign({}, store)

  return {
    store: storeClone,
    runSaga: sagaMiddleware.run
  }
}
