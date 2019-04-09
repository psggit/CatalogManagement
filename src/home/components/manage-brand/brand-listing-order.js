import React from "react"
import { Card } from 'material-ui/Card'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import GenreBasedBrandList from "./genreBasedBrandList"

class ListingOrder extends React.Component {
  constructor() {
    super()

    this.state = {
      loadingBrandList: true,
      genreBasedBrandList: [],
      genreBasedBrandMap: {},
      selectedGenreIdx: "",
      selectedStateIdx: ""
    }
  
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.successBrandListCallback = this.successBrandListCallback.bind(this)
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

  handleGenreChange(e, k) {
    console.log("props", this.props, e.target.name)
    this.setState({
      selectedGenreIdx: parseInt(this.props.genres[k].id)
    })
    this.props.actions.fetchGenreBasedBrandList({
      genre_id: parseInt(this.props.genres[k].id)
    }, this.successBrandListCallback)
  }

  successBrandListCallback() {
    console.log("cheage")
    console.log("state", this.props, this.props.genreBasedBrandList)
    let genreBasedBrandList = [], genreBasedBrandMap = {}
    if(this.props.genreBasedBrandList) {
      genreBasedBrandList = this.props.genreBasedBrandList.map((item) => {
        genreBasedBrandMap[item.id] = Object.assign({}, item, {listingOrder: 0})
        return (
          Object.assign({}, item, {listingOrder: 0})
        )
      })
      console.log("genre list", genreBasedBrandList, genreBasedBrandMap)
    }
    this.setState({ genreBasedBrandList, loadingBrandList: false, genreBasedBrandMap })
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
      this.props.actions.fetchGenreBasedBrandList({
        genre_id: parseInt(newProps.genres[0].id)
      }, this.successBrandListCallback)
    }
  }

  render() {
    console.log("state in parent", this.state)
    return (
      <div style={{
        width: '40%',
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
          </Card>
          {
            !this.state.loadingBrandList &&
            <GenreBasedBrandList 
              brandList={this.state.genreBasedBrandList}
              brandMap={this.state.genreBasedBrandMap}
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