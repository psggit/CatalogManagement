import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../actions'
import ViewSKU from './../components/sku-management/view-sku-list'
import Pagination from '@components/Pagination'

class SKUMapManager extends React.Component {

  constructor() {
    super()
    this.state = {
      activePage: 1,
      pageOffset: 0
    }
    this.pagesLimit = 5
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchSKUs({
      limit: this.pagesLimit,
      offset: 0
    })
  }


  handlePageChange(pageObj) {
    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })

    this.props.actions.fetchSKUs({
      offset: pageObj.offset,
      limit: this.pagesLimit
    })
  }

  render() {
    const { loadingSkuList, skuList, totalSkuCount } = this.props
    //console.log("map", loadingSkuList, "list", skuList)
    const { activePage } = this.state
    return (
      <div style={{ width: '100%'}}>
        <h3>Showing all SKUs</h3>

        <ViewSKU
          loadingSkuList={loadingSkuList}
          skuList={skuList}
          history={this.props.history}
          navigateTo="mapSKU"
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

        {/* <LocalitiesList
          localities={geoLocalitiesData.fences}
          loadingLocalities={loadingGeolocalities}
        />

        {
          !loadingGeolocalities && geoLocalitiesData.fences.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={10}
            totalItemsCount={geoLocalitiesData.count}
            pageRangeDisplayed={5}
            setPage={this.setPage}
          />
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
)(SKUMapManager)


//export default SKUMapManager