import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import asyncComponent from './asyncComponent'
import { Api } from '@utils/config'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { createSession } from './login/utils'

import Login from './login'
import ManageBrand from './../src/home/container/manage-brand'
import ManageBrandCollection from './../src/home/container/manage-brand-collection'
import CreateBrandCollection from './../src/home/components/manage-brand-collection/create-brand-collection'
import ManageGenre from './../src/home/container/manage-genre'
import CreateGenre from './../src/home/components/manage-genre/create-genre'
import EditGenre from './../src/home/components/manage-genre/edit-genre'
import CreateBrand from './../src/home/components/manage-brand/create-brand'
import EditBrand from './../src/home/components/manage-brand/edit-brand'
import ManageListingOrder from "./../src/home/components/manage-brand-listing-order/brand-listing-order"
import ViewSKU from './../src/home/components/sku-management/manage-sku'
import CreateSKU from './../src/home/components/sku-management/create-sku'
import EditSKU from './../src/home/components/sku-management/edit-sku'
import SKUMapManager from './../src/home/container/sku-map-manager'
import ViewSKUMapDetails from './../src/home/components/sku-map-manager/view-sku-map-details'

// import createHistory from 'history/createBrowserHistory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Header from './../src/home/components/header'
import NavigationBar from './../src/home/components/navigation-bar'
import DisplayScreen from './../src/home/container/display-screen'
import WelcomeScreen from './../src/home/container/welcome-screen'
import AccessLogs from "./../src/home/container/access-logs"
import { getBreadCrumbPath, getUriFromBreadCrumb } from '@utils/url-utils'
import { Provider } from 'react-redux'
import { createBrowserHistory as createHistory } from 'history'
import ManageCollection from './../src/home/container/manage-collection'

import configureStore from './home/store/configureStore'
import rootSaga from './home/middleware/saga'

const config = configureStore()
config.runSaga(rootSaga)

const history = createHistory()

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      isDrawerOpen: false,
      headerTitle: getBreadCrumbPath().length ? getBreadCrumbPath() : 'Welcome'
    }
  }

  componentDidMount() {
    const breadCrumbUri = getUriFromBreadCrumb(this.state.headerTitle)
    history.listen((location) => {
      if (location.pathname !== breadCrumbUri) {
        this.setState({ headerTitle: getBreadCrumbPath(breadCrumbUri) })
      }
    })
  }

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
          if (location.pathname.includes('login') || location.pathname == '/') {
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
      <Provider store={config.store}>
        <Router>
          <div>
            <Route path='/admin/login' component={Login} />
            {
              !location.pathname.includes('login') &&
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
                        <Route exact path="/admin/manage-brand/listing-order" component={ManageListingOrder} />

                        <Route exact path="/admin/manage-genre/" component={ManageGenre} />
                        <Route exact path="/admin/manage-genre/create" component={CreateGenre} />
                        <Route exact path="/admin/manage-genre/edit/:genreName" component={EditGenre} />

                        <Route exact path="/admin/manage-sku" component={ViewSKU} />
                        <Route exact path="/admin/manage-sku/create" component={CreateSKU} />
                        <Route exact path="/admin/manage-sku/edit/:brandName" component={EditSKU} />

                        <Route exact path="/admin/manage-brand-collection" component={ManageBrandCollection} />
                        <Route exact path="/admin/manage-brand-collection/create" component={CreateBrandCollection} />
                        {/* <Route exact path="/admin/manage-sku/edit/:brandName" component={EditSKU} /> */}

                        <Route exact path="/admin/access-logs" component={AccessLogs} />

                        <Route exact path="/admin/manage-collection/" component={ManageCollection} />
                      </Switch>
                    </DisplayScreen>
                  </div>
                </MuiThemeProvider>
              </div>
            }
          </div>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App

