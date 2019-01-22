import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import SkuDetailsForm from './sku-details-form'
import { Card } from 'material-ui/Card'
import { getQueryObj } from '@utils/url-utils'

class editSKU extends React.Component {

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
    const queryObj = getQueryObj(location.search.slice(1))
    const data = this.skuDetailsForm.getData()
    this.setState({ isDisabled: true })
    this.props.actions.updateSku({
      sku_id: parseInt(queryObj.sku_id),
      brand_id: parseInt(queryObj.brand_id),
      volume: parseInt(data.volume),
      image_url: data.image_url,
      high_res_image: data.high_res_image,
      low_res_image: data.low_res_image,
      is_active: data.statusIdx === 1 ? true : false,
    }, this.callbackUpdate)
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
            <SkuDetailsForm
              ref={(node) => { this.skuDetailsForm = node }}
              skuInfo={this.props.history.location.state}
              submit={this.submit}
              brandName={this.props.match.params.brandName}
              isDisabled={true}
              action="edit"
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
)(editSKU)
