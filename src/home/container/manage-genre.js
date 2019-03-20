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
import ViewGenres from './../components/manage-genre/view-genre-list'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import {unMountModal} from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import ModalFooter from '@components/ModalBox/ModalFooter';

import * as Roles from './../constants/roles'

class ManageGenre extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //shouldMountCreateSKU: false,
      //shouldMountFilterDialog: false,
      activePage: 1,
      pageOffset: 0,
      genreStatus: '',
      genreName: '',
      genreId: '',
      // filterObj: {
      //   column: '',
      //   operator: '',
      //   value: ''
      // },
      // isFilterApplied: false
    }
    // this.filter = {
    //   column: '',
    //   operator: '',
    //   value: ''
    // }
    this.pagesLimit = 5
    this.handlePageChange = this.handlePageChange.bind(this)
    // this.mountFilterDialog = this.mountFilterDialog.bind(this)
    // this.unmountFilterModal = this.unmountFilterModal.bind(this)
    // this.applyFilter = this.applyFilter.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.updateGenreStatus = this.updateGenreStatus.bind(this)
    this.setDialogState = this.setDialogState.bind(this)
    this.fetchGenres = this.fetchGenres.bind(this)
    // this.resetFilter = this.resetFilter.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  componentDidMount() {
    //console.log("history", this.props.history)
    this.fetchGenres()
  }

  fetchGenres() {
    //console.log("fetch brands")
    if (location.search.length) {
      //console.log("if")
      this.setQueryParamas()
    } else {
      this.props.actions.fetchGenres({
        limit: this.pagesLimit,
        offset: 0,
        //filter: {}
      })
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      //this.filter[item[0]] = item[1]
    })

    if(queryObj.column && queryObj.column.length > 0) {
      this.setState({filterObj: this.filter, isFilterApplied: true})
      this.props.actions.fetchGenres({
          offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
          limit: this.pagesLimit,
          filter: {
            column: queryObj.column,
            operator: queryObj.operator,
            value: queryObj.value
          }
      })
    } 
    else {
      this.props.actions.fetchGenres({
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
   
      this.props.actions.fetchGenres({
        offset: pageObj.offset,
        limit: this.pagesLimit,
        filter: filterObj
      })

    } else{
      this.props.actions.fetchGenres({
        offset: pageObj.offset,
        limit: this.pagesLimit
      })
    }

    history.pushState(queryParamsObj, "genre listing", `/admin/manage-genre?${getQueryUri(queryParamsObj)}`)
  }

  // mountFilterDialog() {
  //   this.setState({ shouldMountFilterDialog: true })
  // }

  // unmountFilterModal() {
  //   this.setState({ shouldMountFilterDialog: false })
  // }

  showDialog(genreObj) {
    console.log("genre status", genreObj)
    this.setState({
      genreStatus: !genreObj.newStatus, 
      mountDialog: true, 
      genreName: genreObj.genreName, 
      genreId: genreObj.genreId
    })
  }

  updateGenreStatus() {
    this.setState({mountDialog: false})
    this.props.actions.updateGenreStatus({
      id: parseInt(this.state.brandId),
      //type: parseInt(this.state.brandType),
      is_active: !this.state.brandStatus
    }, this.callbackUpdate)
  }

  callbackUpdate() {
    this.fetchGenres()
  }

  setDialogState() {
    this.setState({mountDialog: false})
    unMountModal()
  }

  // applyFilter(filterObj) {
  //   const queryObj = {
  //     column: filterObj.column,
  //     operator: filterObj.operator,
  //     value: filterObj.value,
  //     offset: 0,
  //     activePage: 1,
  //   }

  //   this.filter = {
  //     column: filterObj.column,
  //     operator: filterObj.operator,
  //     value: filterObj.value,
  //   }

  //   this.setState({filterObj: this.filter, isFilterApplied: true, activePage: 1})

  //   history.pushState(queryObj, "brand listing", `/admin/manage-brand?${getQueryUri(queryObj)}`)

  //   this.props.actions.fetchBrands({
  //     limit: this.pagesLimit,
  //     offset: 0,
  //     filter: filterObj
  //   })
  // }

  // resetFilter() {
  //   this.setState({
  //       // column: '',
  //       // operator: 'EQUAL',
  //       // value: '',
  //       isFilterApplied: false,
  //       filterObj: {}
  //   })
  //   this.props.history.push(`/admin/manage-brand`)
  //   this.fetchBrands()
  // }

  render() {
    const { loadingGenreList, genreList, genreCount} = this.props
    const { activePage } = this.state

    return (
      <div style={{ width: '100%'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >

          <NavLink to={`/admin/manage-genre/create`}>
            <RaisedButton
              label="CREATE GENRE"
              primary
            />
          </NavLink>
          {/* <div>
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
              //style={{marginRight: '10px'}}
              //icon={getIcon('filter')}
            />
          </div> */}
        </div>

        <br />

        <h3>Listing all genres</h3>

        <ViewGenres
          loadingGenreList={loadingGenreList}
          genreList={genreList}
          history={this.props.history}
          showDialog={this.showDialog}
        />
        {
          this.state.mountDialog &&
          <ModalBox>
            <ModalHeader>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{fontSize: '18px'}}>{this.state.genreStatus === true ? 'Deactivate' : 'Activate'} GENRE</div>
                </div>
            </ModalHeader>
            <ModalBody height='60px'>
                <table className='table--hovered'>
                    <tbody>
                        Are you sure you want to {this.state.genreStatus === true ? 'Deactivate' : 'Activate'} this genre - {this.state.genreName} ({this.state.genreId})
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                    <button className='btn btn-primary' onClick={() => this.updateGenreStatus()}> OK </button>
                    <button className='btn btn-secondary' onClick={() => this.setDialogState()}> Cancel </button>
                </div>
            </ModalFooter>
          </ModalBox>
        }
        {
          !loadingGenreList && genreList && genreList.length >= this.pagesLimit
          ? 
            <React.Fragment>
              <Pagination
                activePage={parseInt(activePage)}
                itemsCountPerPage={this.pagesLimit}
                totalItemsCount={genreCount}
                pageRangeDisplayed={5}
                setPage={this.handlePageChange}
              />
            </React.Fragment>
          : ''
        }
        {/* {
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
        } */}
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
)(ManageGenre)
