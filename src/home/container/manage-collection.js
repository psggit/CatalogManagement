import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_circular-progress.scss'
import { NavLink } from 'react-router-dom'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import * as Actions from './../actions'
import ViewCollection from './../components/manage-collection/view-collection'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { unMountModal } from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import ModalFooter from '@components/ModalBox/ModalFooter';
import FilterModal from '@components/filter-modal'
import { getIcon } from '@utils/icon-utils'

class ManageCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldMountFilterDialog: false,
      activePage: 1,
      pageOffset: 0,
      collectionStatus: '',
      collectionName: '',
      collectionId: '',
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
    this.showDialog = this.showDialog.bind(this)
    this.updateCollectionStatus = this.updateCollectionStatus.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.setDialogState = this.setDialogState.bind(this)
    this.fetchCollection = this.fetchCollection.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  componentDidMount() {
    this.fetchCollection()
  }

  fetchCollection() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.props.actions.fetchCollection({
        limit: this.pagesLimit,
        offset: 0
      })
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.props.actions.fetchCollection({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pagesLimit
    })
  }

  handlePageChange(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    let queryParamsObj = {}
    let filterObj = null

    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })
    queryParamsObj = {
      offset: pageObj.offset,
      activePage: pageObj.activePage,
    }

    this.props.actions.fetchCollection({
      offset: pageObj.offset,
      limit: this.pagesLimit
    })

    history.pushState(queryParamsObj, "collection listing", `/admin/manage-collection?${getQueryUri(queryParamsObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  showDialog(collection) {
    this.setState({
      collectionStatus: !collection.newStatus,
      mountDialog: true,
      collectionName: collection.collectionName,
      collectionId: collection.id
    })
  }

  updateCollectionStatus() {
    this.setState({ mountDialog: false })
    this.props.actions.updateCollectionStatus({
      id: parseInt(this.state.collectionId),
      is_active: !this.state.collectionStatus
    }, this.callbackUpdate)
  }

  callbackUpdate() {
    this.fetchCollection()
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

    history.pushState(queryObj, "collection listing", `/admin/manage-collection?${getQueryUri(queryObj)}`)

    this.props.actions.fetchCollection({
      limit: this.pagesLimit,
      offset: 0,
      id: filterObj.value,
    })
  }

  resetFilter() {
    this.setState({
      isFilterApplied: false,
      filterObj: {}
    })
    this.props.history.push(`/admin/manage-collection`)
    this.fetchCollection()
  }

  render() {
    const { loadingCollection, collection, totalCollectionCount } = this.props
    const { activePage } = this.state

    return (
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <NavLink to={`/admin/manage-collection/create`}>
            <RaisedButton
              label="CREATE COLLECTION"
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

        <h3>Listing All Collection</h3>

        <ViewCollection
          loadingCollection={loadingCollection}
          collection={collection}
          history={this.props.history}
          showDialog={this.showDialog}
        />
        {
          this.state.mountDialog &&
          <ModalBox>
            <ModalHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '18px' }}>{this.state.collectionStatus === true ? 'Deactivate' : 'Activate'} COLLECTION</div>
              </div>
            </ModalHeader>
            <ModalBody height='60px'>
              <table className='table--hovered'>
                <tbody>
                  Are you sure you want to {this.state.collectionStatus === true ? 'Deactivate' : 'Activate'} this collection - {this.state.collectionName} ({this.state.collectionId})
                    </tbody>
              </table>
            </ModalBody>
            <ModalFooter>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                <button className='btn btn-primary' onClick={() => this.updateCollectionStatus()}> OK </button>
                <button className='btn btn-secondary' onClick={() => this.setDialogState()}> Cancel </button>
              </div>
            </ModalFooter>
          </ModalBox>
        }
        {
          !loadingCollection && collection
            ?
            <React.Fragment>
              <Pagination
                activePage={parseInt(activePage)}
                itemsCountPerPage={this.pagesLimit}
                totalItemsCount={totalCollectionCount}
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
                title="Filter Collection"
                unmountFilterModal={this.unmountFilterModal}
                filter="collectionFilter"
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
)(ManageCollection)
