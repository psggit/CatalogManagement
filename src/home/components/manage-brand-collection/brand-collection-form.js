import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import PropTypes from "prop-types"
import '@sass/components/_form.scss'
import RaisedButton from 'material-ui/RaisedButton'
import { validateTextField, validateNumberField } from './../../../utils/validators'

class BrandCollectionForm extends React.Component {
  constructor(props) {
    super(props)
    this.intitialState = {
      brandId: 0,
      genreId: 0,
      brandList: [],
      collectionId: 0,
      collectionList: [],
      listingOrder: '',
     
      listingOrderErr: {
        value: '',
        status: false
      }
    }

    this.inputNameMap = {
      'listingOrder': 'Listing order'
    }

    this.state = Object.assign({}, this.intitialState)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleBrandChange = this.handleBrandChange.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleCollectionChange = this.handleCollectionChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.brandList !== this.props.brandList && !newProps.loadingBrandList) {
      const brandList = newProps.brandList.map((item) => {
        return {
          text: item.brand_name,
          value: item.id
        }
      })
      this.setState({
        brandList,
        brandId: newProps.brandList.length > 0 ? newProps.brandList[0].id : ""
      })
    }
    if (newProps.genres !== this.props.genres && !newProps.loadingGenres) {
      this.setState({ genreId: newProps.genres[0].id })
      this.props.fetchGenreBasedBrandList(newProps.genres[0].id)
    }
    if(newProps.collectionList !== this.props.collectionList && !newProps.loadingCollectionList) {
     
      const collectionList = newProps.collectionList.map((item) => {
        return {
          text: item.display_name,
          value: item.id
        }
      })
      this.setState({
        collectionList,
        collectionId: newProps.collectionList.length > 0 ? newProps.collectionList[0].id : ""
      })
    }
  }

  handleGenreChange (e, k) {
    this.setState({
      genreId: this.props.genres[k].id
    })
    this.props.fetchGenreBasedBrandList(this.props.genres[k].id)
  }

  handleBrandChange (e, k) {
    this.setState({
      brandId: this.props.brandList[k].id
    })
  }

  handleCollectionChange (e, k) {
    this.setState({
      collectionId: this.props.collectionList[k].id
    })
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [e.target.name]: e.target.value,
      [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
    })
  }

  isFormValid() {
    const listingOrderErr = validateNumberField(this.inputNameMap['listingOrder'], this.state.listingOrder)
    this.setState({ listingOrderErr: validateNumberField(this.inputNameMap['listingOrder'], this.state.listingOrder) })

    if(!listingOrderErr.status) {
      return true
    }
    return false
  }

  handleSave() {
    if(this.isFormValid())
      this.props.submit()
  }

  getData() {
    return this.state
  }

  render() {
    const {listingOrderErr} = this.state
    return (
      <Fragment>
        <div className="form-group">
          <label className="label">Genre name*</label>
            <SelectField
              value={this.state.genreId}
              onChange={this.handleGenreChange}
              iconStyle={{ fill: '#9b9b9b' }}
              style={{ width: '100%' }}
              autoComplete='off'
            >
              {
                !this.props.loadingGenres &&
                this.props.genres && this.props.genres.map((item) => {
                  return <MenuItem
                    value={item.id}
                    key={item.id}
                    primaryText={item.genre_name}
                  />
                })
              }
            </SelectField>
        </div>
        <div className="form-group">
          <label className="label">Brand name*</label><br />
          <SelectField
            value={this.state.brandId}
            onChange={this.handleBrandChange}
            iconStyle={{ fill: '#9b9b9b' }}
            style={{ width: '100%' }}
            autoComplete='off'
          >
            {
              !this.props.loadingBrandList &&
              this.props.brandList && this.props.brandList.map((item, i) => {
                return <MenuItem
                  value={item.id}
                  key={item.id}
                  primaryText={item.brand_name}
                />
              })
            }
          </SelectField>
        </div>

        <div className="form-group">
          <label className="label">Collection name*</label><br />
          <SelectField
            value={this.state.collectionId}
            onChange={this.handleCollectionChange}
            iconStyle={{ fill: '#9b9b9b' }}
            style={{ width: '100%' }}
            autoComplete='off'
          >
            {
              !this.props.loadingCollectionList &&
              this.props.collectionList && this.props.collectionList.map((item, i) => {
                return <MenuItem
                  value={item.id}
                  key={item.id}
                  primaryText={item.display_name}
                />
              })
            }
          </SelectField>
        </div>
        <div className="form-group">
          <label className="label">Listing order*</label><br />
          <TextField
            onChange={this.handleTextFields}
            name="listingOrder"
            value={this.state.listingOrder}
            style={{ width: '100%' }}
          />
          {
            listingOrderErr.status &&
            <p className="error">* {listingOrderErr.value}</p>
          }
        </div>
        <RaisedButton
          primary
          disabled={this.props.disableSave || this.props.loadingBrandList || this.props.loadingCollectionList}
          label="Save"
          onClick={this.handleSave}
          style={{ marginTop: '40px' }}
        />
      </Fragment>
    )
  }
}

BrandCollectionForm.propTypes = {
  fetchGenreBasedBrandList: PropTypes.func,
  genres: PropTypes.number,
  action: PropTypes.string,
  loadingGenres: PropTypes.bool,
  loadingBrandList: PropTypes.bool,
  loadingCollectionList: PropTypes.bool,
  collectionList: PropTypes.array,
  submit: PropTypes.func,
  brandList: PropTypes.array
}

export default BrandCollectionForm
