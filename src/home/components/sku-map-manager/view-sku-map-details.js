import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import * as Actions from './../../actions'
import { getQueryObj } from '@utils/url-utils'
import MappedStatesList from './mapped-states-list'
import AddStatesToSku from './add-state-to-sku'
import { Card } from 'material-ui/Card';

class ViewSKUMapDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      brandId: 0,
      brandName: '',
      skuId: 0,
      volume: 0,
      SKUStatus: false,
      disableSave: false,
      loadingData: true,
      mappedStatesToSkuList: [],
      mappedStatesToSkuMap: {}
    }
    this.updateStateMappedToSku = this.updateStateMappedToSku.bind(this)
    this.mountAddStateToSkuDialog = this.mountAddStateToSkuDialog.bind(this)
    this.unmountAddStateToSkuDialog = this.unmountAddStateToSkuDialog.bind(this)
    this.mapStateToSku = this.mapStateToSku.bind(this)
    this.successFetchStatesCallback = this.successFetchStatesCallback.bind(this)
    this.mapStates = this.mapStates.bind(this)
    //this.failureCallback = this.failureCallback.bind(this)
  }

  componentDidMount() {
    const history = this.props.history.location.state
    this.setState({
      brandId: history.brand_id,
      brandName: history.brand_name,
      skuId: this.props.match.params.skuId,
      volume: history.volume,
      SKUStatus: history.is_active
    })

    this.props.actions.fetchStates({}, this.successFetchStatesCallback)
  }

  successFetchStatesCallback() {
    //console.log("success fetch states", this.props.statesList)
    this.props.actions.fetchStatesMappedToSku({
      sku_id: parseInt(this.props.match.params.skuId)
    }, this.mapStates)
  }

  // failureCallback() {
  //   this.setState({loadingData: false})
  // }

  mapStates() {
    if(!this.props.mappedStatesToSkuData) {
      this.setState({loadingData: false})
    } else {
      const statesMap = {}
      this.props.statesList && this.props.statesList.map((item) => {
        return statesMap[item.state_id] = {
          state_id: item.state_id,
          state_name: item.state_name,
          state_short_name: item.state_short_name
        }
      })
      const mappedStatesToSku = {}
      this.props.mappedStatesToSkuData.map((item) => {
        //console.log("item price", item)
        mappedStatesToSku[statesMap[item.state_id].state_short_name] = {
          sku_pricing_id: parseInt(item.id),
          state_id: parseInt(item.state_id),
          state_name: statesMap[item.state_id].state_name,
          sku_id: parseInt(this.props.match.params.skuId),
          price: item.price,
          tag: item.tag,
          is_active: item.is_active,
          state_short_name: statesMap[item.state_id].state_short_name,
          is_modified: false
        }
      })
      this.setState({
        mappedStatesToSkuMap: mappedStatesToSku, 
        mappedStatesToSkuList: Object.values(mappedStatesToSku), 
        loadingData: false 
      })
    }
  }

  updateStateMappedToSku(stateDetailObj) {
    this.setState({disableSave: true})
    this.props.actions.updateSkuStateMap(stateDetailObj,() => {
      setTimeout(() => {
        this.setState({disableSave: false})
      })
      this.props.actions.fetchStatesMappedToSku({
        sku_id: parseInt(this.props.match.params.skuId)
      }, this.mapStates)
    })
  }

  // handleUnmapState(stateDetailObj) {
  //   stateDetailObj['sku_id'] = this.state.skuId
  //   this.props.actions.updateSkuStateMap(stateDetailObj,() => {})
  // }

  mountAddStateToSkuDialog() {
    this.setState({ shouldMountAddStateToSkuDialog: true })
  }

  unmountAddStateToSkuDialog() {
    this.setState({ shouldMountAddStateToSkuDialog: false })
  }

  mapStateToSku(mappedStateObj) {
    this.props.actions.mapStateToSku(mappedStateObj, 
    (response) => {
      this.props.actions.fetchStatesMappedToSku({
        sku_id: parseInt(this.props.match.params.skuId)
      }, this.mapStates)
    })
  }

  render() {
    return (
      <div style={{ width: '100%'}}>
        <Card
          style={{
            padding: '0px 20px',
            width: '400px',
            marginTop: '0',
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'top',
            marginBottom: '40px'
          }}
        >
          {
            <div>
              <p><b>Brand id</b>: { this.state.brandId }</p>
              <p><b>Brand name</b>: { this.state.brandName }</p>
              <p><b>Sku id</b>: { this.state.skuId }</p>
              <p><b>Volume</b>: { this.state.volume } ml</p>
              <p><b>SKU Status</b>: { this.state.SKUStatus ? 'Active' : 'Inactive' }</p>
            </div>
          }
        </Card>
        <div>
          <h3 style={{ margin: 0 }}>Listing states</h3>
          <RaisedButton
            primary
            label="Add state"
            onClick={this.mountAddStateToSkuDialog}
            style={{ margin: '20px 0' }}
          />
          <MappedStatesList
            loadingStatesMappedToSku = {this.state.loadingData}
            skuMappedData = {this.state.mappedStatesToSkuList}
            skuStateMap = {this.state.mappedStatesToSkuMap}
            handleSaveStateDetails = {this.updateStateMappedToSku}
            disableSave = {this.state.disableSave}
          />
        </div>
        <br/><br/>
        {
          this.state.shouldMountAddStateToSkuDialog &&
          <AddStatesToSku
            skuId = {this.props.match.params.skuId}
            handleClose = {this.unmountAddStateToSkuDialog}
            handleAddStateToSku = {this.mapStateToSku}
            statesList = {this.props.statesList}
            skuMappedData = {this.state.mappedStatesToSkuList}
            loadingStatesMappedToSku = {this.state.loadingData}
          />
        } 
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

// ViewLocalityMapDetails.propTypes = {
//   mappedRetailersToLocality: PropTypes.arrayOf(PropTypes.object).isRequired,
//   loadingMappedRetailersToLocality: PropTypes.bool.isRequired,
//   mappedDpToLocality: PropTypes.arrayOf(PropTypes.object).isRequired,
//   loadingMappedDpToLocality: PropTypes.bool.isRequired
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewSKUMapDetails)
