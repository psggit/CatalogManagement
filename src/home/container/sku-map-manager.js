import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import * as Actions from './../actions'
import ViewSKU from './../components/sku-management/view-sku-list'
import Pagination from '@components/pagination'
import FilterModal from '@components/filter-modal'
import {getIcon} from '@utils/icon-utils'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import {unMountModal} from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import ModalFooter from '@components/ModalBox/ModalFooter'

class SKUMapManager extends React.Component {

  constructor() {
    super()
    this.state = {
      shouldMountFilterDialog: false,
      activePage: 1,
      pageOffset: 0,
      mountDialog: false,
      filterObj: {
        column: '',
        operator: '',
        value: ''
      },
      isFilterApplied: false
    }
    this.filter = {
      column: '',
      operator: '',
      value: ''
    }
    this.pagesLimit = 5
    this.handlePageChange = this.handlePageChange.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.fetchSKUs = this.fetchSKUs.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  componentDidMount() {
    this.fetchSKUs()
  }

  applyFilter(filterObj) {
    const queryObj = {
      column: filterObj.column,
      operator: filterObj.operator,
      value: filterObj.value,
      offset: 0,
      activePage: 1,
    }

    this.filter = {
      column: filterObj.column,
      operator: filterObj.operator,
      value: filterObj.value,
    }

    this.setState({filterObj: this.filter, isFilterApplied: true, activePage: 1})

    history.pushState(queryObj, "sku listing", `/admin/sku-mapping?${getQueryUri(queryObj)}`)

    this.props.actions.fetchSKUs({
      limit: this.pagesLimit,
      offset: 0,
      filter: filterObj
    })
  }

  fetchSKUs() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.props.actions.fetchSKUs({
        limit: this.pagesLimit,
        offset: 0
      })
    }
  }

  resetFilter() {
    this.setState({
      isFilterApplied: false,
      filterObj: {}
    })
    this.props.history.push(`/admin/sku-mapping`)
    this.fetchSKUs()
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      this.filter[item[0]] = item[1]
    })

    if(queryObj.column && queryObj.column.length > 0) {
      this.setState({filterObj: this.filter, isFilterApplied: true})
      this.props.actions.fetchSKUs({
          offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
          limit: this.pagesLimit,
          filter: {
            column: queryObj.column,
            operator: queryObj.operator,
            value: queryObj.value
          }
      })
    } else {
      this.props.actions.fetchSKUs({
          offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
          limit: this.pagesLimit
      })
    }
  }

  handlePageChange(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    let queryParamsObj = {}
    let filterObj = null

    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })

    if(queryObj && queryObj.column && queryObj.column.length > 0) {
      queryParamsObj = {
          column: queryObj.column,
          operator: queryObj.operator,
          value: queryObj.value,
          offset: pageObj.offset,
          activePage: pageObj.activePage,
      }
    } else {
      queryParamsObj = {
          offset: pageObj.offset,
          activePage: pageObj.activePage,
      }
    }

    if(location.search.length && queryObj.column && queryObj.column.length > 0) {
      let filterObj = {
          column: queryObj.column,
          operator: queryObj.operator,
          value: queryObj.value
      }
   
      this.props.actions.fetchSKUs({
        offset: pageObj.offset,
        limit: this.pagesLimit,
        filter: filterObj
      })

    } else{
      this.props.actions.fetchSKUs({
        offset: pageObj.offset,
        limit: this.pagesLimit
      })
    }

    history.pushState(queryParamsObj, "sku listing", `/admin/sku-mapping?${getQueryUri(queryParamsObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  showDialog(skuDetailsObj) {
    this.setState({
      skuStatus: !skuDetailsObj.newStatus, 
      mountDialog: true, 
      skuId: skuDetailsObj.skuId, 
      volume: skuDetailsObj.volume,
      brandName: skuDetailsObj.brandName
    })
  }

  updateSKUStatus() {
    this.setState({mountDialog: false})
    this.props.actions.updateSKUStatus({
      sku_id: parseInt(this.state.skuId),
      //type: parseInt(this.state.brandType),
      is_active: !this.state.skuStatus
    }, this.callbackUpdate)
  }

  callbackUpdate() {
    this.fetchSKUs()
  }

  setDialogState() {
    this.setState({mountDialog: false})
    unMountModal()
  }

  render() {
    const { loadingSkuList, skuList, totalSkuCount } = this.props
    const { activePage } = this.state
    return (
      <div style={{ width: '100%'}}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <RaisedButton
              onClick={this.mountFilterDialog}
              label="Filter"
              icon={getIcon('filter')}
              style={{marginRight: '10px'}}
            />

            <RaisedButton
              onClick={this.resetFilter}
              label="Reset Filter"
              disabled={!this.state.isFilterApplied}
            />
        </div>
        <h3>Showing all SKUs</h3>

        <ViewSKU
          loadingSkuList={loadingSkuList}
          skuList={skuList}
          history={this.props.history}
          navigateTo="mapSKU"
          showDialog={this.showDialog}
        />

        {
          this.state.mountDialog &&
          <ModalBox>
              <ModalHeader>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div style={{fontSize: '18px'}}>{this.state.skuStatus === true ? 'Deactivate' : 'Activate'} SKU</div>
                  </div>
              </ModalHeader>
              <ModalBody height='60px'>
                  <table className='table--hovered'>
                      <tbody>
                          Are you sure you want to {this.state.skuStatus === true ? 'deactivate' : 'activate'} this sku - {this.state.volume}ml ({this.state.brandName})
                      </tbody>
                  </table>
              </ModalBody>
              <ModalFooter>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                      <button className='btn btn-primary' onClick={() => this.updateSKUStatus()}> OK </button>
                      <button className='btn btn-secondary' onClick={() => this.setDialogState()}> Cancel </button>
                  </div>
              </ModalFooter>
              
          </ModalBox>
        }

        {
          !loadingSkuList && skuList
          ? 
            <React.Fragment>
              <Pagination
                activePage={parseInt(activePage)}
                itemsCountPerPage={this.pagesLimit}
                totalItemsCount={totalSkuCount}
                pageRangeDisplayed={5}
                setPage={this.handlePageChange}
              />
            </React.Fragment>
          : ''
        }

        {
          this.state.shouldMountFilterDialog
          ? (
            <FilterModal
              applyFilter={this.applyFilter}
              title="Filter Brands"
              unmountFilterModal={this.unmountFilterModal}
              filter="brandFilter"
              filterObj= {this.state.filterObj}
            ></FilterModal>
          )
          : ''
        }
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
)(SKUMapManager)


//export default SKUMapManager