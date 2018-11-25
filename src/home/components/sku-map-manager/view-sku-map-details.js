import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import * as Actions from './../../actions'
import { getQueryObj } from '@utils/url-utils'
import MappedStatesList from './mapped-states-list'
import AddStatesToSku from './add-state-to-sku'
import AddRetailersToSku from './add-retailers-to-sku'
import MappedSKURetailersList from './mapped-sku-retailer-list'
import { Card } from 'material-ui/Card';

class ViewSKUMapDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      brandId: 0,
      brandName: '',
      skuId: 0,
      //skuPricingId: 0,
      volume: 0,
      shouldMountAddRetailerDialog: false,
      shouldMountAddStateToSkuDialog: false,
      disableSave: false,
      disableSaveInRetailerList: false
    }
    this.updateStateMappedToSku = this.updateStateMappedToSku.bind(this)
    this.mountAddStateToSkuDialog = this.mountAddStateToSkuDialog.bind(this)
    this.unmountAddStateToSkuDialog = this.unmountAddStateToSkuDialog.bind(this)
    this.mountAddRetailerDialog = this.mountAddRetailerDialog.bind(this)
    this.unmountAddRetailerDialog = this.unmountAddRetailerDialog.bind(this)
    this.mapStateToSku = this.mapStateToSku.bind(this)
    this.mapRetailerToSku = this.mapRetailerToSku.bind(this)
    this.handleUpdateRetailerDetails = this.handleUpdateRetailerDetails.bind(this)
    //this.handleUnmapState = this.handleUnmapState.bind(this)
  }

  componentDidMount() {
    const history = this.props.history.location.state
    //console.log("history", history)
    this.setState({
      brandId: history.brand_id,
      brandName: history.brand_name,
      skuId: this.props.match.params.skuId,
      //skuPricingId: history.sku_pricing_id,
      volume: history.volume,
      //status: history.is_active
    })

    this.props.actions.fetchStatesMappedToSku({
      sku_id: parseInt(this.props.match.params.skuId)
    })

    this.props.actions.fetchRetailersMappedToSku({
      sku_id: this.props.match.params.skuId
    })
  }

  updateStateMappedToSku(stateDetailObj) {
    this.setState({disableSave: true})
    //stateDetailObj['sku_id'] = parseInt(this.state.skuId)
    this.props.actions.updateSkuStateMap(stateDetailObj,() => {
      setTimeout(() => {
        this.setState({disableSave: false})
      })
      this.props.actions.fetchStatesMappedToSku({
        sku_id: parseInt(this.props.match.params.skuId)
      })
    })
  }

  // handleUnmapState(stateDetailObj) {
  //   stateDetailObj['sku_id'] = this.state.skuId
  //   this.props.actions.updateSkuStateMap(stateDetailObj,() => {})
  // }

  handleUpdateRetailerDetails(retailerDetailObj) {
    this.setState({disableSaveInRetailerList: true})
    retailerDetailObj['sku_id'] = this.state.skuId
    this.props.actions.updateSkuRetailerMap(retailerDetailObj,() => {
      setTimeout(() => {
        this.setState({disableSaveInRetailerList: false})
      })
    })
  }

  // handleDeleteRetailer(id) {
  //   const queryObj = getQueryObj(location.search.slice(1))
  //   this.props.actions.deleteRetailerFromLocalityMap({
  //     retailer_id: id,
  //     locality_id: parseInt(queryObj.id)
  //   })
  // }

  // handleDeleteDp(id) {
  //   const queryObj = getQueryObj(location.search.slice(1))
  //   this.props.actions.deleteDpFromLocalityMap({
  //     dp_id: id,
  //     locality_id: parseInt(queryObj.id)
  //   })
  // }

  // handleMakePrimeRetailer(id) {
  //   const queryObj = getQueryObj(location.search.slice(1))
  //   if (!this.primeRetailerId) {
  //     this.props.actions.mapRetailerToLocalityAsPrime({
  //       retailer_id: id,
  //       locality_id: parseInt(queryObj.id)
  //     })
  //   } else {
  //     const CB = this.state.isPrime
  //       ? () => {
  //         this.props.actions.mapRetailerToLocalityAsPrime({
  //           retailer_id: id,
  //           locality_id: parseInt(queryObj.id)
  //         })
  //       }
  //       : () => {
  //         this.props.actions.fetchLocalityRetailersMap({
  //           locality_id: parseInt(queryObj.id)
  //         })
  //       }
  //     this.props.actions.unmapRetailerToLocalityAsPrime({
  //       retailer_id: this.primeRetailerId,
  //       locality_id: parseInt(queryObj.id)
  //     }, CB)
  //   }
  // }

  // unmountConfirmDeleteRetailer() {
  //   this.setState({ shouldMountConfirmDeleteRetailer: false })
  // }

  // mountConfirmDeleteRetailer(retailer_id) {
  //   this.setState({ shouldMountConfirmDeleteRetailer: true, retailer_id })
  // }

  // unmountConfirmDeleteDp() {
  //   this.setState({ shouldMountConfirmDeleteDp: false })
  // }

  // mountConfirmDeleteDp(dp_id) {
  //   this.setState({ shouldMountConfirmDeleteDp: true, dp_id })
  // }

  // unmountConfirmMakePrimeRetailer() {
  //   this.setState({ shouldMountConfirmMakePrimeRetailer: false })
  // }

  // mountConfirmMakePrimeRetailer(retailer_id, val) {
  //   this.setState({ shouldMountConfirmMakePrimeRetailer: true, retailer_id, isPrime: val })
  // }

  // mountAddRetailerDialog() {
  //   this.setState({ shouldMountAddRetailerDialog: true })
  // }

  mountAddStateToSkuDialog() {
    this.setState({ shouldMountAddStateToSkuDialog: true })
  }

  unmountAddStateToSkuDialog() {
    this.setState({ shouldMountAddStateToSkuDialog: false })
  }

  mountAddRetailerDialog() {
    this.setState({ shouldMountAddRetailerDialog: true })
  }

  unmountAddRetailerDialog() {
    this.setState({ shouldMountAddRetailerDialog: false })
  }

  mapStateToSku(mappedStateObj) {
    this.props.actions.mapStateToSku(mappedStateObj, 
    (response) => {
      //console.log("id", this.props.match.params.skuId)
      this.props.actions.fetchStatesMappedToSku({
        sku_id: parseInt(this.props.match.params.skuId)
      })
    })
  }

  mapRetailerToSku(mappedRetailerObj) {
    //console.log("mapped retailer object", mappedRetailerObj)
    this.props.actions.mapRetailerToSku(mappedRetailerObj, 
    (response) => {
      this.props.actions.updateSkuRetailerMap({
        sku_id: this.props.match.params.skuId
      })
    })
  }

  render() {
    
    return (
      <div style={{ width: '100%'}}>
        <Card
          style={{
            padding: '0px 20px',
            width: '40%',
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
            loadingStatesMappedToSku = {this.props.loadingStatesMappedToSku}
            skuMappedData = {this.props.mappedStatesToSkuData}
            handleSaveStateDetails = {this.updateStateMappedToSku}
            //handleUnmapState = {this.handleUnmapState}
            disableSave = {this.state.disableSave}
          />
        </div>
        <br/><br/>
        {/* <div>
          <h3 style={{ margin: 0 }}>Listing mapped retailers</h3>
          <RaisedButton
            primary
            label="Add retailer"
            onClick={this.mountAddRetailerDialog}
            style={{ margin: '20px 0' }}
          />
          <MappedSKURetailersList
            loadingMappedRetailers = {this.props.loadingSkuMappedRetailers}
            mappedRetailersData = {this.props.mappedRetailersData}
            handleUpdateRetailerDetails = {this.handleUpdateRetailerDetails}
            disableSave = {this.state.disableSaveInRetailerList}
          />
        </div> */}
        {/* {
          this.state.shouldMountConfirmDeleteRetailer &&
          <ConfirmDeleteRetailer
            retailer_id={this.state.retailer_id}
            unmountConfirmDeleteRetailer={this.unmountConfirmDeleteRetailer}
            handleDeleteRetailer={this.handleDeleteRetailer}
          />
        }

        {
          this.state.shouldMountConfirmDeleteDp &&
          <ConfirmDeleteDp
            dp_id={this.state.dp_id}
            unmountConfirmDeleteDp={this.unmountConfirmDeleteDp}
            handleDeleteDp={this.handleDeleteDp}
          />
        }

        {
          this.state.shouldMountConfirmMakePrimeRetailer &&
          <ConfirmMakePrimeRetailer
            retailer_id={this.state.retailer_id}
            unmountConfirmMakePrimeRetailer={this.unmountConfirmMakePrimeRetailer}
            handleMakePrimeRetailer={this.handleMakePrimeRetailer}
          />
        }

        {
          this.state.shouldMountAddRetailerDialog &&
          <AddRetailerDialog
            unmountAddRetailerDialog={this.unmountAddRetailerDialog}
          />
        } */}

        {
          this.state.shouldMountAddStateToSkuDialog &&
          <AddStatesToSku
            skuId = {this.props.match.params.skuId}
            handleClose = {this.unmountAddStateToSkuDialog}
            handleAddStateToSku = {this.mapStateToSku}
          />
        } 
        {
          this.state.shouldMountAddRetailerDialog &&
          <AddRetailersToSku
            skuId = {this.props.match.params.skuId}
            handleClose = {this.unmountAddRetailerDialog}
            handleAddRetailerToSku = {this.mapRetailerToSku}
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
