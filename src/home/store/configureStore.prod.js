import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./../reducers"

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  const storeClone = Object.assign({}, store)

  return {
    store: storeClone,
    runSaga: sagaMiddleware.run
  }
}
