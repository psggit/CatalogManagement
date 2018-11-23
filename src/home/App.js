import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './actions'

class App extends React.Component {
  constructor(props){
    super()
    //console.log("props", this.props)
  }

  componentDidMount() {
    //console.log("this.props", this.props)
    // this.props.actions.fetchSKUs({
    //   limit: 40,
    //   offset: 0
    // })
    this.props.actions.fetchLiveOrders({
      limit: 40,
      offset: 0
    })
    //this.props.actions.fetchRepositories("react");
  }

  render() {
    return (
      <div> App page </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

//export default App