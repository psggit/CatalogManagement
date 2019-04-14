import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import GenreForm from './new-genre-form'
import { Card } from 'material-ui/Card'

class CreateGenre extends React.Component {

  constructor() {
    super()
    this.state = {
      isDisabled: false
    }
    this.submit = this.submit.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  callbackUpdate() {
    this.setState({ isDisabled: false })
  }

  submit() {
    const data = this.genreForm.getData()
    if(data.genreName.length) {
      this.setState({ isDisabled: true })
      this.props.actions.createGenre({
        genre_name: data.genreName,
        ordinal_position: data.ordinalPosition,
        display_name: data.displayName,
        image: data.genreImage,
        is_active: true
      }, this.callbackUpdate)
    }
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
            <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Create new genre</h3>
            <GenreForm
              ref={(node) => { this.genreForm = node }}
              isDisabled={this.state.isDisabled}
              submit={this.submit}
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
)(CreateGenre)