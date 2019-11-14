import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import BrandForm from './new-brand-form'
import { Card } from 'material-ui/Card'

class CreateBrand extends React.Component {

  constructor() {
    super()
    this.state = {
      isDisabled: false
    }
    this.submit = this.submit.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchBrandTypes({
      limit: 10,
      offset: 0
    })
    this.props.actions.fetchGenres({
      limit: 10000,
      offset: 0
    })
  }

  callbackUpdate() {
    this.setState({ isDisabled: false })
  }

  submit() {
    const data = this.brandForm.getData()
    if(data.brandName.length > 0) {
      this.setState({ isDisabled: true })
      this.props.actions.createBrand({
        brand_name: data.brandName,
        type: data.typeIdx,
        alcohol_per: (data.alcoholPercentage),
        genre_name: data.genreName,
        genre_id: data.genreIdx,
        temperature: (data.temperature),
        cal_per: (data.caloriesPercentage),
        cal_total: (data.caloriesTotal),
        high_res_image: data.high_res_image,
        low_res_image: data.low_res_image,
        brand_logo_high_res_image: data.highResBrandLogo,
        brand_logo_low_res_image: data.lowResBrandLogo,
        tag: data.tag,
        description: data.description,
        is_active: true
      }, this.callbackUpdate)
    }
  }

  render() {
    console.log("create brand", this.props.brandTypeList)
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
            <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Create new brand</h3>
            <BrandForm
              ref={(node) => { this.brandForm = node }}
              disableNameField={false}
              brandTypeList={this.props.brandTypeList}
              genreList={this.props.genreList}
              loadingGenreList={this.props.loadingGenreList}
              isDisabled={this.state.isDisabled}
              submit={this.submit}
              loadingBrandTypeList={this.props.loadingBrandTypeList}
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
)(CreateBrand)