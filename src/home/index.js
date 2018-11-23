import React, { Component } from 'react'
import { Provider } from 'react-redux'
// import createSagaMiddleware from "redux-saga"
// import { createStore, applyMiddleware } from "redux"
// import rootReducer from "./reducer"
// import reduxLogger from '@utils/redux-logger'
//import watchRequest from './watchers'
import configureStore from './store/configureStore'
import rootSaga from './middleware/saga'
import App from './App'

const config = configureStore()
config.runSaga(rootSaga)

//const sagaMiddleware = createSagaMiddleware();
//const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, reduxLogger));
//sagaMiddleware.run(watchRequest);

const Root = () => (
  <Provider store={config.store}>
  {/* <Provider> */}
    <App />
  </Provider>
)

export default Root
