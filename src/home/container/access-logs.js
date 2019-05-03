import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../actions'
import Pagination from '@components/pagination'
import FilterModal from '@components/filter-modal'
import RaisedButton from 'material-ui/RaisedButton'
import {getIcon} from '@utils/icon-utils'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewAccessLog from "./../components/manage-access-logs/view-access-logs"

class AccessLogs extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldMountFilterDialog: false,
      activePage: 1,
      // filter: {},
      isFilterApplied: false
    }

    this.pagesLimit = 5
    this.handlePageChange = this.handlePageChange.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
  }

  componentDidMount() {
    this.fetchAccessLogs()
  }

  fetchAccessLogs() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.props.actions.fetchAccessLogs({
        limit: this.pagesLimit,
        offset: 0
      })
    }
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      //this.filter[item[0]] = item[1]
    })

    if(queryObj.filter) {
      this.setState({filter: (decodeURI(queryObj.filter)), isFilterApplied: true})
      this.props.actions.fetchAccessLogs({
          offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
          limit: this.pagesLimit,
          filter: JSON.parse(decodeURI(queryObj.filter))
      })
    } else {
      this.props.actions.fetchAccessLogs({
        offset: queryObj.activePage 
                ? this.pagesLimit * (parseInt(queryObj.activePage) - 1) 
                : 0,
        limit: this.pagesLimit
      })
    }
  }

  handlePageChange(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    let queryParamsObj = {}

    let pageNumber = pageObj.activePage
    this.setState({ activePage: pageNumber })

    if(queryObj.filter) {
      queryParamsObj = {
        filter: queryObj.filter,
        activePage: pageObj.activePage,
      }
    } else {
      queryParamsObj = {
        activePage: pageObj.activePage,
      }
    }

    if(queryObj.filter) {
      let filterObj = {
        to: JSON.parse(decodeURI(queryObj.filter)).to,
        from: JSON.parse(decodeURI(queryObj.filter)).from
      }

      this.props.actions.fetchAccessLogs({
        offset: pageObj.offset,
        limit: this.pagesLimit,
        filter: filterObj
      })

    } else {
      this.props.actions.fetchAccessLogs({
        offset: pageObj.offset,
        limit: this.pagesLimit
      })
    }

    history.pushState(queryParamsObj, "access logs listing", `/admin/access-logs?${getQueryUri(queryParamsObj)}`)
  }

  applyFilter(filterObj) {
    console.log("filtre", filterObj)
    const queryObj = {
      activePage: 1,
      filter: JSON.stringify(filterObj)
    }

    this.setState({filter: JSON.stringify(filterObj), isFilterApplied: true, activePage: 1})

    history.pushState(queryObj, "access log listing", `/admin/access-logs?${getQueryUri(queryObj)}`)

    this.props.actions.fetchAccessLogs({
      limit: this.pagesLimit,
      offset: 0,
      filter: filterObj
    })
  }

  resetFilter() {
    this.setState({
      isFilterApplied: false,
      filter: undefined
    })
    this.props.history.push(`/admin/access-logs`)
    this.fetchAccessLogs()
  }

  render() {
    const { loadingAccessLogs, accessLogs, accessLogCount } = this.props
    const { activePage } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <div>
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
        </div>
        <h3>Listing all access logs</h3>

        <ViewAccessLog
          loadingAccessLogs={loadingAccessLogs}
          accessLogs={accessLogs}
          history={this.props.history}
        />
        {
          this.state.shouldMountFilterDialog
          ? (
            <FilterModal
              applyFilter={this.applyFilter}
              title="Filter Logs"
              unmountFilterModal={this.unmountFilterModal}
              filter="accessLogsFilter"
              filterObj={(this.state.filter !== undefined) ? ((this.state.filter)) : undefined }
            ></FilterModal>
          )
          : ''
        }
        {
          !loadingAccessLogs && accessLogs
            ?
            <React.Fragment>
              <Pagination
                activePage={parseInt(activePage)}
                itemsCountPerPage={this.pagesLimit}
                totalItemsCount={accessLogCount}
                pageRangeDisplayed={5}
                setPage={this.handlePageChange}
              />
            </React.Fragment>
            : ''
        }
      </React.Fragment>
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
)(AccessLogs)