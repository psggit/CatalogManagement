import React from "react"
import { Card } from 'material-ui/Card'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import GenreBasedBrandList from "./genreBasedBrandList"
import RaisedButton from 'material-ui/RaisedButton'

class ListingOrder extends React.Component {
  constructor() {
    super()

    this.state = {
      loadingBrandList: true,
      genreBasedBrandList: [],
      genreBasedBrandMap: {},
      selectedGenreIdx: "",
      selectedStateIdx: "",
      isSavingDetails: false,
      loadingBrandAndListingOrder: false
    }
  
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.fetchGenreBasedBrandList = this.fetchGenreBasedBrandList.bind(this)
    this.successBrandListCallback = this.successBrandListCallback.bind(this)
    this.createOrUpdateBrandListingOrder = this.createOrUpdateBrandListingOrder.bind(this)
    this.mergeBrandListWithListingOrder = this.mergeBrandListWithListingOrder.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchStates({}, () => {})
    this.props.actions.fetchGenreList({})
  }

  handleStateChange(e, k) {
    console.log("props", this.props, e.target.name)
    this.setState({
      selectedStateIdx: parseInt(this.props.statesList[k].state_id)
    })
  }

  fetchGenreBasedBrandList() {
    // this.props.actions.setLoadingState('loadingGenreBasedBrandList')
    this.setState({loadingBrandAndListingOrder: true})
    this.props.actions.fetchGenreBasedBrandList({
      genre_id: this.state.selectedGenreIdx,
      state_id: this.state.selectedStateIdx
    }, this.successBrandListCallback)
  }

  handleGenreChange(e, k) {
    this.setState({
      selectedGenreIdx: parseInt(this.props.genres[k].id),
      loadingBrandList: true
    })
  }

  mergeBrandListWithListingOrder() {
    let genreBasedBrandMap = {}
    if(this.props.genreBasedBrandList && this.props.brandListingOrder) {
      this.props.genreBasedBrandList.map((brand) => {
        let foundListingOrder = false, listingOrderIdx = ""
        this.props.brandListingOrder.map((item, i) => {
          if(item.brand_id === brand.id) {
            foundListingOrder = true
            listingOrderIdx = i
          }
        })
        let brandWithListingOrder = {}
        if(foundListingOrder) {
          brandWithListingOrder = {
            brand_id: brand.id,
            brand_name: brand.brand_name,
            state_id: this.state.selectedStateIdx,
            listing_order: this.props.brandListingOrder[listingOrderIdx].listing_order
          }
          genreBasedBrandMap[brand.id] = Object.assign({}, brandWithListingOrder)
        } else {
          brandWithListingOrder = {
            brand_id: brand.id,
            brand_name: brand.brand_name,
            state_id: this.state.selectedStateIdx,
            listing_order: 0
          }
          genreBasedBrandMap[brand.id] = Object.assign({}, brandWithListingOrder)
        }
      })
    } else {
      this.props.genreBasedBrandList.map((brand) => {
        genreBasedBrandMap[brand.id] = Object.assign({}, brand, {listing_order: 0, state_id: this.state.selectedStateIdx})
      })
    }

    return genreBasedBrandMap
  }

  successBrandListCallback() {
    let genreBasedBrandMap = this.mergeBrandListWithListingOrder()
    this.setState({ 
      genreBasedBrandList: Object.values(genreBasedBrandMap), 
      loadingBrandList: false, 
      genreBasedBrandMap,
      loadingBrandAndListingOrder: false
    })
  }

  componentWillReceiveProps(newProps) {
    if(this.props.statesList !== newProps.statesList) {
      this.setState({
        selectedStateIdx: parseInt(newProps.statesList[0].state_id)
      })
    }
    if(this.props.genres !== newProps.genres) {
      this.setState({
        selectedGenreIdx: parseInt(newProps.genres[0].id)
      })
    }
  }

  createOrUpdateBrandListingOrder() {
    this.setState({isSavingDetails: true})
    this.props.actions.updateBrandListingOrder({
      brand_listing_order: this.state.genreBasedBrandList
    }, () => {
      console.log("hjkk")
      this.setState({isSavingDetails: false})
    })
  }

  render() {
    //console.log("state in parent", this.state)
    return (
      <div style={{
        width: '50%',
        position: 'relative',
        display: 'block',
        verticalAlign: 'top',
        marginRight: '20px'
      }}
      >
        <div>
          <Card
            style={{
              padding: '20px',
              width: '100%'
            }}
          >
            <div className="form-group">
              <label className="label">State</label><br />
              <SelectField
                value={this.state.selectedStateIdx}
                onChange={this.handleStateChange}
                style={{ width: '100%' }}
              >
                {
                  !this.props.loadingStates && this.props.statesList.map((item, i) => (
                    <MenuItem
                      value={parseInt(item.state_id)}
                      key={parseInt(item.state_id)}
                      primaryText={item.state_name}
                    />
                  ))
                }
              </SelectField>
            </div>

            <div className="form-group">
              <label className="label">Genre</label><br />
              <SelectField
                value={this.state.selectedGenreIdx}
                onChange={this.handleGenreChange}
                style={{ width: '100%' }}
              >
                {
                  !this.props.loadingGenres && this.props.genres.map((item, i) => (
                    <MenuItem
                      value={parseInt(item.id)}
                      key={parseInt(item.id)}
                      primaryText={item.genre_name}
                    />
                  ))
                }
              </SelectField>
            </div>
            <RaisedButton
              primary
              disabled={this.state.loadingBrandAndListingOrder}
              label="FETCH BRAND LIST"
              onClick={this.fetchGenreBasedBrandList}
              style={{ marginTop: '40px' }}
            />
          </Card>
          {
            !this.state.loadingBrandList &&
            <GenreBasedBrandList 
              brandList={this.state.genreBasedBrandList}
              brandMap={this.state.genreBasedBrandMap}
              loadingData={this.state.loadingBrandList}
              isSavingDetails={this.state.isSavingDetails}
              createOrUpdateBrandListingOrder = {this.createOrUpdateBrandListingOrder}
            />
          }
        </div>
      </div>
    )
  }
}

//export default ListingOrder
const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingOrder)