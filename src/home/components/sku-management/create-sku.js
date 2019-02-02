import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import SkuDetailsForm from './sku-details-form'
import { Card } from 'material-ui/Card'
import { getQueryObj } from '@utils/url-utils'

class createSKU extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isDisabled: false
    }
    this.submit = this.submit.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState()
    this.props.actions.fetchBrands({
      limit: 1000,
      offset: 0
    })
  }

  callbackUpdate() {
    this.setState({ isDisabled: false })
  }

  submit() {
    const data = this.skuDetailsForm.getData()
    console.log("sku form", data)
    if (data.volume) {
      this.setState({ isDisabled: true })
      this.props.actions.createSku({
        brand_id: parseInt(data.brandId),
        sku_volume: parseInt(data.volume),
        image_url: data.image_url,
        high_res_image: data.high_res_image,
        low_res_image: data.low_res_image,
        gs1_barcode: data.gs1_barcode,
        barcode_image: data.barcode_image,
        tag: data.tag,
        is_active: data.statusIdx === 1 ? true : false
      }, this.callbackUpdate)
    }
  }

  render() {
    const {loadingBrandDetails, brands} = this.props
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
            <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Create new sku</h3>
            <SkuDetailsForm
              ref={(node) => { this.skuDetailsForm = node }}
              isDisabled={false}
              disableSave={this.state.isDisabled}
              submit={this.submit}
              //statusData={['active', 'inactive']}
              //status={true}
              //brandName={this.state.brandName}
              loadingBrandList={loadingBrandDetails}
              brandList={brands}
              action="create"
            />
          </Card>
          {/* <RaisedButton
            primary
            disabled={this.state.isDisabled}
            label="Save"
            onClick={this.submit}
            style={{ marginTop: '40px' }}
          /> */}
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
)(createSKU)