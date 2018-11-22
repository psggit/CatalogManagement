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
      <MuiThemeProvider>
        <div style={{ padding: '0 10%' }}>
          <h1 style={{ color: '#333'}}>@hipbar</h1>
          <hr />
          <Form />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Login
