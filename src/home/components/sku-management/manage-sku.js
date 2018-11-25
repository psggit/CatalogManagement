
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import { NavLink } from 'react-router-dom'
import FilterModal from '@components/filter-modal'
import {getIcon} from '@utils/icon-utils'
import ViewSKU from './view-sku-list'
import Pagination from '@components/Pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'


class SkuList extends React.Component {
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
      this.props.actions.fetchSKUs({
        limit: this.pagesLimit,
        offset: 0
      })
    }
  }

  applyFilter(filterObj) {
    const queryObj = {
      searchBy: filterObj.filter_by,
      searchOperator: filterObj.operator,
      searchText: filterObj.search_text,
      offset: 0,
      activePage: 1,
    }

    history.pushState(queryObj, "sku listing", `/home/manage-sku?${getQueryUri(queryObj)}`)

    this.props.actions.fetchSKUs({
      limit: this.pagesLimit,
      offset: 0,
      filter: filterObj
    })
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      this.filter[item[0]] = item[1]
    })

    this.props.actions.fetchSKUs({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pagesLimit,
      filter: {
        filter_by: queryObj.searchBy,
        operator: queryObj.searchOperator,
        search_text: queryObj.searchText
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
        searchBy: queryObj.searchBy,
        searchOperator: queryObj.searchOperator,
        searchText: queryObj.searchText,
        offset: pageObj.offset,
        activePage: pageObj.activePage,
      }
      filterObj = {
        filter_by: queryObj.searchBy,
        operator: queryObj.searchOperator,
        search_text: queryObj.searchText
      }
      history.pushState(queryParamsObj, "sku listing", `/home/manage-sku?${getQueryUri(queryParamsObj)}`)
    }

    this.props.actions.fetchSKUs({
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

  render() {
    const { loadingSkuList, skuList, totalSkuCount } = this.props
    const { activePage } = this.state

    return (
      <div style={{ width: '100%', overflow: 'hidden'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <NavLink to={`/home/manage-sku/create-new-sku`}>
            <RaisedButton
              label="CREATE NEW SKU"
              primary
              onClick={this.mountCreateSKUDialog}
            />
          </NavLink>

          <RaisedButton
            onClick={this.mountFilterDialog}
            label="Filter"
            icon={getIcon('filter')}
          />
        </div>

        <br />

        <h3>Showing all SKUs</h3>

        <ViewSKU
          loadingSkuList={loadingSkuList}
          skuList={skuList}
          history={this.props.history}
          navigateTo= "editSKU"
        />

        {
          !loadingSkuList 
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
)(SkuList)
