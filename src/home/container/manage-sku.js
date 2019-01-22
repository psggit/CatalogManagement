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
//import ViewBrands from './../components/sku-management/view-brand-list'
import Pagination from '@components/pagination'

import * as Roles from './../constants/roles'

class ManageSKU extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldMountCreateSKU: false,
      shouldMountFilterDialog: false,
      activePage: 1,
      pageOffset: 0
    }
    this.filter = {
      searchField: '',
      searchOperator: '',
      searchText: ''
    }
    this.pagesLimit = 5
    this.handlePageChange = this.handlePageChange.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.props.actions.fetchBrands({
        limit: this.pagesLimit,
        offset: 0,
        filter: false
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
      filter: queryObj.filter ? true : false,
      searchField: queryObj.searchField,
      searchOperator: queryObj.searchOperator,
      searchText: queryObj.searchText,
    })
  }

  handlePageChange(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })

    this.props.actions.fetchBrands({
      offset: pageObj.offset,
      limit: this.pagesLimit,
      filter: queryObj.filter ? true : false,
      searchField: queryObj.searchField,
      searchOperator: queryObj.searchOperator,
      searchText: queryObj.searchText,
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

  applyFilter(filterObj) {
    const queryObj = {
      searchBy: filterObj.filter_by,
      searchOperator: filterObj.operator,
      searchText: filterObj.search_text,
      offset: 0,
      activePage: 1,
    }

    history.pushState(queryObj, "brand listing", `/admin/manage-sku?${getQueryUri(queryObj)}`)

    this.props.actions.fetchBrands({
      limit: this.pagesLimit,
      offset: 0,
      filter: filterObj
    })
  }

  render() {
    const { loadingBrandList, brands, totalBrandCount } = this.props
    const { activePage } = this.state

    return (
      <div style={{ width: '100%'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <RaisedButton
            onClick={this.mountFilterDialog}
            label="Filter"
            icon={getIcon('filter')}
          />
        </div>

        <br />

        {/* <h3>Select brand</h3>

        <ViewBrands
          loadingBrandList={loadingBrandList}
          brandList={brands}
        /> */}

        {
          !loadingBrandList
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
)(ManageSKU)
