import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
//import { Redirect } from 'react-router'
import asyncComponent from './asyncComponent'
import {  Api } from '@utils/config'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { createSession } from './login/utils'
import Login from './login'
import Home from './home'
//const Login = asyncComponent(() => import("./login").then(module => module.default),{ name: "Page 1" })
//const Home = asyncComponent(() => import("./home").then(module => module.default),{ name: "Page 1" })

class App extends React.Component {
  // componentWillMount() {
  //   const fetchOptions = {
  //     method: 'get',
  //     credentials: 'include',
  //     mode: 'cors',
  //     'x-hasura-role': 'user'
  //   }

  //   fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         console.log(`Looks like there was a problem. Status Code: ${response.status}`)
  //         if (location.pathname !== '/login') {
  //           location.href = '/login'
  //         }
  //         return
  //       }
  //       response.json().then((data) => {
  //         createSession(data)
  //         if (!location.pathname.includes('home')) {
  //           location.href = '/home'
  //         }
  //       })
  //     })
  //     .catch((err) => {
  //       console.log('Fetch Error :-S', err)
  //       if (location.pathname !== '/login') {
  //         location.href = '/login'
  //       }
  //     })
  // }

  componentWillMount() {
    const fetchOptions = {
        method: 'get',
        credentials: 'include',
        mode: 'cors',
        'x-hasura-role': 'user'
    }

    fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
      .then((response) => {
          if (response.status !== 200) {
              console.log(`Looks like there was a problem. Status Code: ${response.status}`)
              if (location.pathname !== '/admin/login') {
              location.href = '/admin/login'
              }
              return
          }
          response.json().then((data) => {
              createSession(data)
              if(location.pathname.includes('login') || location.pathname == '/') {
                  location.href = '/admin'
                  //history.push('/admin')
              }
          })
      })
      .catch((err) => {
          console.log('Fetch Error :-S', err)
          if (location.pathname !== '/admin/login') {
              location.href = '/admin/login'
          }
      })
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Route path='/login' component={Login} />
          <Route exact path='/' component={Home} />
          <Route path='/home' component={Home} /> */}

          <Route path='/admin/login' component={Login} />
          <Route exact path='/admin' component={Home} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App

