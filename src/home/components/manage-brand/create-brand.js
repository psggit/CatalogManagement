import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import BrandForm from './new-brand-form'
import { Card } from 'material-ui/Card'
import { getQueryObj } from '@utils/url-utils'

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
    // this.props.actions.fetchOriginList({
    //   limit: 1000,
    //   offset: 0
    // })
    this.props.actions.fetchBrandTypes({})
  }

  callbackUpdate() {
    this.setState({ isDisabled: false })
  }

  submit() {
    const data = this.brandForm.getData()
    if(data.brandName.length > 0 && data.image_url.length > 0) {
    //if(data.brandName.length > 0) {
      this.setState({ isDisabled: true })
      this.props.actions.createBrand({
        brand_name: data.brandName,
        type: data.typeIdx,
        //origin_name: data.origin,
        alcohol_per: parseInt(data.alcoholPercentage),
        temperature: parseInt(data.temperature),
        cal_per: parseInt(data.caloriesPercentage),
        cal_total: parseInt(data.caloriesTotal),
        image: data.image_url,
        high_res_image: data.high_res_image,
        low_res_image: data.low_res_image,
        description: data.description,
        is_active: true
      }, this.callbackUpdate)
    }
  }

  render() {
    return (
      <div style={{
        width: '40%',
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
              //originList={this.props.originList}
              brandTypeList={this.props.brandTypeList}
              //loadingOriginList={this.props.loadingOriginList}
              loadingBrandTypeList={this.props.loadingBrandTypeList}
            />
          </Card>
          <RaisedButton
            primary
            disabled={this.state.isDisabled}
            label="Save"
            onClick={this.submit}
            style={{ marginTop: '40px' }}
          />
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