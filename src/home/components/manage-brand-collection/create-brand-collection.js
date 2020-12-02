import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import BrandCollectionForm from './brand-collection-form'
import { Card } from 'material-ui/Card'
import { getQueryObj } from '@utils/url-utils'

class createBrandCollection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isDisabled: false
    }
    this.submit = this.submit.bind(this)
    this.fetchGenreBasedBrandList = this.fetchGenreBasedBrandList.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState()
    this.props.actions.fetchGenreList({})
  }

  fetchGenreBasedBrandList(genreId) {
    this.props.actions.fetchGenreBasedBrandList(
      {
        genre_id: parseInt(genreId)
      }, () => { })
  }

  callbackUpdate() {
    this.setState({ isDisabled: false })
  }

  submit() {
    const data = this.brandCollectionForm.getData()
    
    this.setState({ isDisabled: true })
    this.props.actions.createBrandCollection({
      collection_id: parseInt(data.brandId),
      brand_id: parseInt(data.volume),
      listing_order: data.image_url
    }, this.callbackUpdate)
  }

  render() {
    const { loadingGenreBasedBrandList, genreBasedBrandList, genres, loadingGenres } = this.props
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
            <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Create new brand collection</h3>
            <BrandCollectionForm
              ref={(node) => { this.brandCollectionForm = node }}
              isDisabled={false}
              disableSave={this.state.isDisabled}
              submit={this.submit}
              loadingBrandList={loadingGenreBasedBrandList}
              loadingGenres={loadingGenres}
              genres={genres}
              brandList={genreBasedBrandList}
              fetchGenreBasedBrandList={this.fetchGenreBasedBrandList}
              action="create"
            />
          </Card>
        </div>

      </div>
    )
  }
}

createBrandCollection.propTypes = {
  loadingGenres: PropTypes.bool,
  loadingGenreBasedBrandList: PropTypes.bool,
  genres: PropTypes.array,
  genreBasedBrandList: PropTypes.array,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createBrandCollection)