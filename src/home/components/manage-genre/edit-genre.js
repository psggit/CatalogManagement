import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import GenreForm from './new-genre-form'
import { Card } from 'material-ui/Card'
import { getQueryObj } from '@utils/url-utils'

class editGenre extends React.Component {

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
    const queryObj = this.props.history.location.state
    const data = this.genreForm.getData()
    this.setState({ isDisabled: true })
    this.props.actions.updateGenre({
      genre_id: parseInt(queryObj.id),
      genre_name: (data.genreName).trim(),
      ordinal_position: parseInt(data.ordinalPosition),
      display_name: data.displayName.trim(),
      image: data.genreImage.trim(),
      is_active: data.statusIdx === 1 ? true : false,
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
            <GenreForm
              ref={(node) => { this.genreForm = node }}
              genreData={this.props.history.location.state}
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
)(editGenre)