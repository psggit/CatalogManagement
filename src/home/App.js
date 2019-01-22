// import React from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import * as Actions from './actions'

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {  Api } from '@utils/config'
//import "whatwg-fetch"
import { Router } from 'react-router'
import { connect } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Header from './components/header'
import NavigationBar from './components/navigation-bar'
import DisplayScreen from './container/display-screen'
import WelcomeScreen from './container/welcome-screen'
import ManageBrand from './container/manage-brand'
import CreateBrand from './components/manage-brand/create-brand'
import EditBrand from './components/manage-brand/edit-brand'
import ViewSKU from './components/sku-management/manage-sku'
import CreateSKU from './components/sku-management/create-sku'
import EditSKU from './components/sku-management/edit-sku'
import SKUMapManager from './container/sku-map-manager'
import ViewSKUMapDetails from './components/sku-map-manager/view-sku-map-details'
import { getBreadCrumbPath, getUriFromBreadCrumb } from '@utils/url-utils'

const history = createHistory()

class App extends React.Component {
  constructor(props){
    super()
    this.state = {
      // key: 0,
      isDrawerOpen: false,
      headerTitle: getBreadCrumbPath().length ? getBreadCrumbPath() : 'Welcome'
    }
    //console.log("props", this.props)
  }

  componentDidMount() {
    //console.log("this.props", this.props)
    // this.props.actions.fetchSKUs({
    //   limit: 40,
    //   offset: 0
    // })
    // this.props.actions.fetchLiveOrders({
    //   limit: 40,
    //   offset: 0
    // })
    //this.props.actions.fetchRepositories("react");
    const breadCrumbUri = getUriFromBreadCrumb(this.state.headerTitle)
    history.listen((location) => {
      // const { key } = this.state
      // this.setState({ key: key + 1 })
      if (location.pathname !== breadCrumbUri) {
        this.setState({ headerTitle: getBreadCrumbPath(breadCrumbUri) })
      }
    })
  }

  handleLogout() {
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }

    fetch(`${Api.authUrl}/user/logout`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          localStorage.clear()
          location.href = '/admin/login'
          return
        }
        response.json().then((data) => {
          localStorage.clear()
          location.href = '/admin/login'
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        localStorage.clear()
        location.href = '/admin/login'
      })
  }

  render() {
    const { isDrawerOpen, headerTitle } = this.state
   
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: '#5E35B1'
      },
    });

    return (
      <Router history={history}>
        <div>
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              <Header
                logout={this.handleLogout}
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={this.toggleDrawer}
                //headerTitle={headerTitle}
              />
              <NavigationBar
                setHeaderTitle={this.setHeaderTitle}
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={this.toggleDrawer}
                handleCloseDrawer={this.handleCloseDrawer}
              />
              {/* <DisplayScreen key={this.state.key} > */}
              <DisplayScreen>
                  <Switch>
                    {/* <Route exact path="/" component={WelcomeScreen} /> */}
                    <Route exact path="/admin" component={WelcomeScreen} />

                    <Route exact path="/admin/sku-mapping/" component={SKUMapManager} />
                    <Route exact path="/admin/sku-mapping/:skuId" component={ViewSKUMapDetails} />

                    <Route exact path="/admin/manage-brand/" component={ManageBrand} />
                    <Route exact path="/admin/manage-brand/create" component={CreateBrand} />
                    <Route exact path="/admin/manage-brand/edit/:brandName" component={EditBrand} />

                    <Route exact path="/admin/manage-sku" component={ViewSKU} />
                    <Route exact path="/admin/manage-sku/create" component={CreateSKU} />
                    <Route exact path="/admin/manage-sku/edit/:brandName" component={EditSKU} />
                  </Switch>
              </DisplayScreen> 
            </div>
          </MuiThemeProvider>
        </div>
      </Router>       
    )
  }
}

// const mapStateToProps = state => state.main

// const mapDispatchToProps = dispatch => ({
//  actions: bindActionCreators(Actions, dispatch)
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)

export default App