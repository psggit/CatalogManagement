import React from 'react'
import Form from './form'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Login extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    // if (!location.href.split('/')[3].length) history.pushState(null, null, '/login')
  }

  render() {
    return (
      <Form />
    )
  }
}

export default Login
