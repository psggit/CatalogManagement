import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import RoleBasedComponent from '@components/RoleBasedComponent'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import '@sass/components/_circular-progress.scss'
import { NavLink } from 'react-router-dom'
import {getIcon} from '@utils/icon-utils'
import FilterModal from '@components/filter-modal'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import * as Actions from './../actions'
import ViewBrands from './../components/manage-brand/view-brand-list'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import {unMountModal} from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import ModalFooter from '@components/ModalBox/ModalFooter';

import * as Roles from './../constants/roles'

class ManageBrand extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //shouldMountCreateSKU: false,
      shouldMountFilterDialog: false,
      activePage: 1,
      pageOffset: 0,
      brandStatus: '',
      brandName: '',
      brandId: ''
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
    this.updateBrandStatus = this.updateBrandStatus.bind(this)
    this.setDialogState = this.setDialogState.bind(this)
    this.fetchBrands = this.fetchBrands.bind(this)
  }

  componentDidMount() {
    //console.log("history", this.props.history)
    this.fetchBrands()
  }

  fetchBrands() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.props.actions.fetchBrands({
        limit: this.pagesLimit,
        offset: 0,
        filter: {
          column : "BrandName",
          operator: "CASEIGNORE",
          value: "Jack daniEl's Old No.7"
        }
        //filter: {}
      })
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      this.filter[item[0]] = item[1]
    })

    this.props.actions.fetchBrands({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pagesLimit,
      filter: {
        column: queryObj.column,
        operator: queryObj.operator,
        value: queryObj.value
      }
    })
  }

  handlePageChange(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    let filterObj = null

    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })

    if(location.search.length) {
      const queryParamsObj = {
        column: filterObj.column,
        operator: filterObj.operator,
        value: filterObj.value,
        offset: pageObj.offset,
        activePage: pageObj.activePage,
      }
  
      history.pushState(queryParamsObj, "brand listing", `/admin/manage-brand?${getQueryUri(queryParamsObj)}`)

      filterObj = {
        column: queryObj.column,
        operator: queryObj.operator,
        value: queryObj.value
      }
    }

    this.props.actions.fetchBrands({
      offset: pageObj.offset,
      limit: this.pagesLimit,
      filter: filterObj
    })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  showDialog(brandObj) {
    //console.log("brand status", brandObj.newStatus)
    this.setState({
      brandStatus: !brandObj.newStatus, 
      mountDialog: true, 
      brandName: brandObj.brandName, 
      brandId: brandObj.brandId,
      brandType: brandObj.brandType
    })
  }

  updateBrandStatus() {
    this.setState({mountDialog: false})
    this.props.actions.updateBrand({
      brand_id: this.state.brandId,
      type: this.state.brandType,
      is_active: !this.state.brandStatus
    }, this.callbackUpdate)
    //console.log("update")
  }

  callbackUpdate() {
    this.fetchBrands()
  }

  setDialogState() {
    this.setState({mountDialog: false})
    unMountModal()
  }

  applyFilter(filterObj) {
    const queryObj = {
      column: filterObj.column,
      operator: filterObj.operator,
      value: filterObj.value,
      offset: 0,
      activePage: 1,
    }

    history.pushState(queryObj, "brand listing", `/admin/manage-brand?${getQueryUri(queryObj)}`)

    this.props.actions.fetchBrands({
      limit: this.pagesLimit,
      offset: 0,
      filter: filterObj
    })
  }

  render() {
    const { loadingBrandList, brands, totalBrandCount} = this.props
    const { activePage } = this.state

    return (
      <div style={{ width: '100%'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >

          <NavLink to={`/admin/manage-brand/create`}>
            <RaisedButton
              label="CREATE BRAND"
              primary
            />
          </NavLink>

          <RaisedButton
            onClick={this.mountFilterDialog}
            label="Filter"
            icon={getIcon('filter')}
          />
        </div>

        <br />

        <h3>Listing all brands</h3>

        <ViewBrands
          loadingBrandList={loadingBrandList}
          brandList={brands}
          history={this.props.history}
          showDialog={this.showDialog}
        />
        {
          this.state.mountDialog &&
          <ModalBox>
            <ModalHeader>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{fontSize: '18px'}}>{this.state.brandStatus === true ? 'Deactivate' : 'Activate'} BRAND</div>
                </div>
            </ModalHeader>
            <ModalBody height='60px'>
                <table className='table--hovered'>
                    <tbody>
                        Are you sure you want to {this.state.brandStatus === true ? 'Deactivate' : 'Activate'} this brand - {this.state.brandName} ({this.state.brandId})
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                    <button className='btn btn-primary' onClick={() => this.updateBrandStatus()}> OK </button>
                    <button className='btn btn-secondary' onClick={() => this.setDialogState()}> Cancel </button>
                </div>
            </ModalFooter>
          </ModalBox>
        }
        {
          !loadingBrandList && brands && brands.length > 1 
          ? 
            <React.Fragment>
              <Pagination
                activePage={parseInt(activePage)}
                itemsCountPerPage={this.pagesLimit}
                totalItemsCount={totalBrandCount}
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
)(ManageBrand)
