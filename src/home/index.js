import React, { Component } from 'react'
import { Provider } from 'react-redux'
//import configureStore from './../store/configureStore'
//import rootSaga from './../middleware/saga'
import App from './App'

//const config = configureStore()
//config.runSaga(rootSaga)

const Root = () => (
  // <Provider store={config.store}>
  <Provider>
    <App />
  </Provider>
)

export default Root
