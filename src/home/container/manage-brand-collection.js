import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_circular-progress.scss'
import { NavLink } from 'react-router-dom'
import { getIcon } from '@utils/icon-utils'
import FilterModal from '@components/filter-modal'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import * as Actions from './../actions'
import ViewBrandCollection from './../components/manage-brand-collection/view-brand-collection-list'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { unMountModal } from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import ModalFooter from '@components/ModalBox/ModalFooter'

class ManageBrandCollection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shouldMountFilterDialog: false,
      activePage: 1,
      pageOffset: 0,
      brandCollectionStatus: '',
      brandCollectionId: '',
      filterObj: {
        column: '',
        value: ''
      },
      isFilterApplied: false
    }
    this.filter = {
      column: '',
      value: ''
    }
    this.pagesLimit = 5
    this.handlePageChange = this.handlePageChange.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.updateBrandCollectionStatus = this.updateBrandCollectionStatus.bind(this)
    this.setDialogState = this.setDialogState.bind(this)
    this.fetchBrandCollection = this.fetchBrandCollection.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  componentDidMount() {
    this.fetchBrandCollection()
  }

  fetchBrandCollection() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.props.actions.fetchBrandCollection({
        limit: this.pagesLimit,
        offset: 0,
        with_limits: true
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

    if (queryObj.column && queryObj.column.length > 0) {
      this.setState({ filterObj: this.filter, isFilterApplied: true })
      this.props.actions.fetchBrandCollection({
        offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
        limit: this.pagesLimit,
        with_limits: true,
        id: queryObj.value
      })
    } else {
      this.props.actions.fetchBrandCollection({
        offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
        limit: this.pagesLimit,
        with_limits: true
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

    if (queryObj && queryObj.column && queryObj.column.length > 0) {
      queryParamsObj = {
        column: queryObj.column,
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

    if (location.search.length && queryObj.column && queryObj.column.length > 0) {
      let filterObj = {
        column: queryObj.column,
        value: queryObj.value
      }

      this.props.actions.fetchBrandCollection({
        offset: pageObj.offset,
        limit: this.pagesLimit,
        id: filterObj.value,
        with_limits: true
      })

    } else {
      this.props.actions.fetchBrandCollection({
        offset: pageObj.offset,
        limit: this.pagesLimit,
        with_limits: true
      })
    }

    history.pushState(queryParamsObj, "brand collection listing", `/admin/manage-brand-collection?${getQueryUri(queryParamsObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  showDialog(brandCollectionObj) {
    this.setState({
      brandCollectionStatus: !brandCollectionObj.newStatus,
      mountDialog: true,
      brandCollectionId: brandCollectionObj.id
    })
  }

  updateBrandCollectionStatus() {
    this.setState({ mountDialog: false })
    this.props.actions.updateBrandCollectionStatus({
      id: parseInt(this.state.brandCollectionId),
      is_active: !this.state.brandCollectionStatus
    }, this.callbackUpdate)
  }

  callbackUpdate() {
    this.fetchBrandCollection()
  }

  setDialogState() {
    this.setState({ mountDialog: false })
    unMountModal()
  }

  applyFilter(filterObj) {
    const queryObj = {
      column: filterObj.column,
      value: filterObj.value,
      offset: 0,
      activePage: 1,
    }

    this.filter = {
      column: filterObj.column,
      value: filterObj.value,
    }

    this.setState({ filterObj: this.filter, isFilterApplied: true, activePage: 1 })

    history.pushState(queryObj, "brand collection listing", `/admin/manage-brand-collection?${getQueryUri(queryObj)}`)

    this.props.actions.fetchBrandCollection({
      limit: this.pagesLimit,
      offset: 0,
      id: filterObj.value,
      with_limits: true
    })
  }

  resetFilter() {
    this.setState({
      isFilterApplied: false,
      filterObj: {}
    })
    this.props.history.push(`/admin/manage-brand-collection`)
    this.fetchBrandCollection()
  }

  render() {
    const { loadingBrandCollections, brandCollections, totalBrandCollectionCount } = this.props
    const { activePage } = this.state

    return (
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >

          <NavLink to={`/admin/manage-brand-collection/create`}>
            <RaisedButton
              label="CREATE BRAND COLLECTION"
              primary
            />
          </NavLink>
          <div>
            <RaisedButton
              onClick={this.mountFilterDialog}
              label="Filter"
              icon={getIcon('filter')}
              style={{ marginRight: '10px' }}
            />
            <RaisedButton
              onClick={this.resetFilter}
              label="Reset Filter"
              disabled={!this.state.isFilterApplied}
            />
          </div>
        </div>

        <br />

        <h3>Listing all brand collection</h3>

        <ViewBrandCollection
          loadingBrandCollectionList={loadingBrandCollections}
          brandCollectionList={brandCollections}
          history={this.props.history}
          showDialog={this.showDialog}
        />
        {
          this.state.mountDialog &&
          <ModalBox>
            <ModalHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '18px' }}>{this.state.brandCollectionStatus === true ? 'Deactivate' : 'Activate'} BRAND COLLECTION</div>
              </div>
            </ModalHeader>
            <ModalBody height='60px'>
              <table className='table--hovered'>
                <tbody>
                  Are you sure you want to {this.state.brandCollectionStatus === true ? 'Deactivate' : 'Activate'} this brand collection - ({this.state.brandCollectionId})
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                <button className='btn btn-primary' onClick={() => this.updateBrandCollectionStatus()}> OK </button>
                <button className='btn btn-secondary' onClick={() => this.setDialogState()}> Cancel </button>
              </div>
            </ModalFooter>
          </ModalBox>
        }
        {
          !loadingBrandCollections && brandCollections
            ?
            <React.Fragment>
              <Pagination
                activePage={parseInt(activePage)}
                itemsCountPerPage={this.pagesLimit}
                totalItemsCount={totalBrandCollectionCount}
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
                title="Filter Brand Collection"
                unmountFilterModal={this.unmountFilterModal}
                filter="brandCollectionFilter"
                filterObj={this.state.filterObj}
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
)(ManageBrandCollection)
