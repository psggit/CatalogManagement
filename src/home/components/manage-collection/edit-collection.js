import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import CollectionForm from './new-collection-form'
import { Card } from 'material-ui/Card'

class editCollection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isDisabled: false,
    }
    this.submit = this.submit.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  callbackUpdate() {
    this.setState({ isDisabled: false })
  }

  submit() {
    const data = this.collectionForm.getData()
    this.setState({ isDisabled: true })
    this.props.actions.updateCollection({
      id: this.props.match.params.collectionName,
      name: data.collectionName,
      display_name: data.displayName,
      // short_name: data.shortName,
    }, this.callbackUpdate)
  }

  render() {
    return (
      <div style={{
        width: '400px',
        position: 'relative',
        display: 'block',
        verticalAlign: 'top',
        marginRight: '20px'
      }}
      >
        <div>
          <Card
            style={{
              padding: '20px',
              width: '100%'
            }}
          >
            <CollectionForm
              ref={(node) => { this.collectionForm = node }}
              collection={this.props.history.location.state}
              submit={this.submit}
              disableSave={this.state.isDisabled}
            />
          </Card>
        </div>

      </div>
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
)(editCollection)