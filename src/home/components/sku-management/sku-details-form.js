import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import PropTypes from "prop-types"
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'
import { POST } from '@utils/fetch'
import { Api } from '@utils/config'
import {getIcon} from '@utils/icon-utils'
import AutoComplete from 'material-ui/AutoComplete'
// import { validateNumType, checkCtrlA } from './../../../utils'
import RaisedButton from 'material-ui/RaisedButton'
import { validateNumType, checkCtrlA, checkCtrlV } from './../../../utils'
import { validateTextField, validateEmail, validateNumberField } from './../../../utils/validators'

class SkuDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.uploadedImageUrl = ''
    this.intitialState = {
      volume: props.skuInfo ? props.skuInfo.volume : '',
      skuId: props.skuInfo ? props.skuInfo.sku_id : '',
      statusIdx: props.skuInfo ? props.skuInfo.is_active ? 1 : 2 : 1,
      shouldTrim: true,
      //brandIdx: 0,
      brandName: props.brandName ? props.brandName : '',
      brandId: 0,
      genreId: 0,
      brandList: [],
      tag:  props.skuInfo ? props.skuInfo.tag : '',
      high_res_image: props.skuInfo ? props.skuInfo.high_res_image : '',
      low_res_image: props.skuInfo ? props.skuInfo.low_res_image : '',
      barcode_image: props.skuInfo ? props.skuInfo.barcode_image : '',
      gs1_barcode: props.skuInfo ? props.skuInfo.gs1_barcode : '', 
      high_res_image_err: false,
      low_res_image_err: false,
      volumeErr: {
        value: '',
        status: false
      },

      gs1BarcodeErr: {
        value: '',
        status: false
      },

      barcodeImageErr: {
        value: '',
        status: false
      },

      tagNameErr: {
        value: '',
        status: false
      },

      brandNameErr: {
        value: '',
        status: false
      }
    }

    this.inputNameMap = {
      'volume': 'Volume',
      'gs1Barcode': 'Gs1 barcode',
      'barcodeImage': 'Barcode image',
      'tagName': 'Tag',
      'brandName': 'Brand name'
    }
    
    this.state = Object.assign({}, this.intitialState)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleBrandChange = this.handleBrandChange.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.selectedBrandName = this.selectedBrandName.bind(this)
  }

  componentWillReceiveProps (newProps) {
    console.log("new", newProps, "old", this.props, newProps.brandList !== this.props.brandList)
    if(newProps.brandList !== this.props.brandList && !newProps.loadingBrandList) {
      const brandList = newProps.brandList.map((item) => {
        return {
          text: item.brand_name,
          value: item.id
        }
      })
      console.log("inside if", newProps.brandList)
      this.setState({
        brandList,
        brandName: newProps.brandList.length > 0 ? newProps.brandList[0].brand_name : "",
        brandId: newProps.brandList.length > 0 ? newProps.brandList[0].id : ""
      })
    }
    if (newProps.genres !== this.props.genres && !newProps.loadingGenres) {
      this.setState({ genreId: newProps.genres[0].id })
      this.props.fetchGenreBasedBrandList(newProps.genres[0].id)
    }
  }

  handleStatusChange (e, k) {
    const statusIdx = k + 1
    console.log(statusIdx)
    this.setState({
      statusIdx
    })
  }

  handleGenreChange (e, k) {
    this.setState({
      genreId: this.props.genres[k].id
    })
    this.props.fetchGenreBasedBrandList(this.props.genres[k].id)
  }

  handleBrandChange (e, k) {
    //const brandIdx = k
    this.setState({
      //brandIdx,
      brandName: this.props.brandList[k].brand_name,
      brandId: this.props.brandList[k].id
    })
  }

  handleChange (e) {
    const errName = `${e.target.name}Err`
    if(validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e)) {
      this.setState({ 
          [e.target.name]: e.target.value,
          [errName]: validateNumberField(this.inputNameMap[e.target.name], e.target.value)
      })
    } else {
        e.preventDefault()
    }   
  }

  handleTextFields (e) {
    const errName = `${e.target.name}Err`
    this.setState({
        [e.target.name]: e.target.value,
        [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
    })
  }

  isFormValid () {
    const volumeErr = validateNumberField(this.inputNameMap['volume'], this.state.volume)
    this.setState({ volumeErr: validateNumberField(this.inputNameMap['volume'], this.state.volume) })

    const brandNameErr = validateTextField(this.inputNameMap['brandName'], this.state.brandName)
    this.setState({ brandNameErr: validateTextField(this.inputNameMap['brandName'], this.state.brandName) })

    // const gs1BarcodeErr = validateTextField(this.inputNameMap['gs1Barcode'], this.state.gs1_barcode)
    // this.setState({ gs1BarcodeErr: validateTextField(this.inputNameMap['gs1Barcode'], this.state.gs1_barcode) })

    // const barcodeImageErr = validateTextField(this.inputNameMap['barcodeImage'], this.state.barcode_image)
    // this.setState({ barcodeImageErr: validateTextField(this.inputNameMap['barcodeImage'], this.state.barcode_image) })

    // const tagNameErr = validateTextField(this.inputNameMap['tagName'], this.state.tag)
    // this.setState({ tagNameErr: validateTextField(this.inputNameMap['tagName'], this.state.tag) })

    if(!volumeErr.status) {
      return true;
    } else if(!brandNameErr.status) {
      return true
    }
    return false
  }

  handleSave () {
    if(this.isFormValid()) {
      this.props.submit()
    }
  }
  getData() {
    return this.state
  }

  handleCheckboxes (e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  selectedBrandName (brand) {
    //console.log("brand", brand, "index", index)
    this.setState({
      //brandIdx: index,
      brandName: brand.brand_name,
      brandId: brand.id
    })
  }

  render() {
    //console.log("props", this.props)
    const {volumeErr, brandNameErr, tagNameErr, gs1BarcodeErr, barcodeImageErr} = this.state
    const dataSourceConfig = {
      text: 'brand_name',
      value: 'id',
    };
    return (
      <Fragment>
        <div className="form-group">
          {
            this.props.action === "create" &&
            <label className="label">Genre name*</label>
          }
         
          {
            this.props.action === "create" &&
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
          }
        </div> 
        <div className="form-group">
          <label className="label">Brand name*</label><br />
          {
            this.props.action !== "edit" ?
              <SelectField
                value={this.state.brandId}
                onChange={this.handleBrandChange}
                iconStyle={{ fill: '#9b9b9b' }}
                style={{ width: '100%' }}
                autoComplete='off'
                //floatingLabelText="Select brand"
                //hintText="Hint text"
              >
                {/* <MenuItem disabled value="">
                  <em>Select brand</em>
                </MenuItem> */}
                {
                  !this.props.loadingBrandList &&
                  this.props.brandList && this.props.brandList.map((item, i) => {
                    return <MenuItem
                      value={item.id}
                      key={item.id}
                      primaryText={`${item.brand_name} (${item.id})`}
                    />
                  })
                }
              </SelectField>
               
              // <AutoComplete
              //   floatingLabelText="Search for brand name"
              //   filter={AutoComplete.caseInsensitiveFilter}
              //   dataSource={this.props.brandList ? this.props.brandList : []}
              //   dataSourceConfig={dataSourceConfig}
              //   onNewRequest={this.selectedBrandName}
              //   className="auto-complete"
              //   style={{ width: '100%' }}
              // />
              :
              <TextField
                disabled={this.props.isDisabled}
                onChange={this.handleTextFields}
                name="brandName"
                value={this.props.brandName}
                style={{ width: '100%' }}
              />
          }
          {
            brandNameErr.status &&
            <p className="error">* {brandNameErr.value}</p>
          }
        </div>

        <div className="form-group">
          <label className="label">Volume in ml*</label><br />
          <TextField
            //disabled={this.props.isDisabled}
            defaultValue={this.props.skuInfo ? this.props.skuInfo.volume : ''}
            name="volume"
            autoComplete='off'
            disabled={this.props.isDisabled}
            style={{ width: '100%' }}
            onKeyDown={(e) => { this.handleChange(e) }} 
            onKeyUp={(e) => { this.handleChange(e) }} 
          />
          {
            volumeErr.status &&
            <p className="error">* {volumeErr.value}</p>
          }
        </div>

        <div className="form-group">
          <label className="label">Tag</label><br />
          <TextField
            //disabled={this.props.isDisabled}
            defaultValue={this.props.skuInfo ? this.props.skuInfo.tag : ''}
            name="tag"
            autoComplete='off'
            hintText="tag1, tag2, tag3"
            //disabled={this.props.isDisabled}
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
          {
            tagNameErr.status &&
            <p className="error">* {tagNameErr.value}</p>
          }
        </div>


        <div className="form-group">
          <label className="label">Status</label><br />
          <SelectField
            value={this.state.statusIdx}
            onChange={this.handleStatusChange}
            iconStyle={{ fill: '#9b9b9b' }}
            style={{ width: '100%' }}
          >
            <MenuItem value={1} primaryText="Active" />
            <MenuItem value={2} primaryText="Inactive" />
          </SelectField>
        </div>

        <div className="form-group">
          <label className="label">High res image</label><br />
          <TextField
            onChange={this.handleTextFields}
            name="high_res_image"
            autoComplete='off'
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.high_res_image}
            style={{ width: '100%' }}
          />
          {
            this.state.high_res_image_err &&
            <p style={{ color: '#ff3b34' }}> High res image url is required </p>
          }
        </div>

        <div className="form-group">
          <label className="label">Low res image</label><br />
          <TextField
            onChange={this.handleTextFields}
            name="low_res_image"
            autoComplete='off'
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.low_res_image}
            style={{ width: '100%' }}
          />
          {
            this.state.low_res_image_err &&
            <p style={{ color: '#ff3b34' }}> Low res image url is required </p>
          }
        </div>

        <div className="form-group">
          <label className="label">Gs1 barcode</label><br />
          <TextField
            onChange={this.handleTextFields}
            name="gs1_barcode"
            autoComplete='off'
            //hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.gs1_barcode}
            style={{ width: '100%' }}
          />
          {
            gs1BarcodeErr.status &&
            <p style={{ color: '#ff3b34' }}>* { gs1BarcodeErr.value }</p>
          }
        </div>

        <div className="form-group">
          <label className="label">Barcode image</label><br />
          <TextField
            onChange={this.handleTextFields}
            name="barcode_image"
            autoComplete='off'
            //hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.barcode_image}
            style={{ width: '100%' }}
          />
          {
            barcodeImageErr.status &&
            <p style={{ color: '#ff3b34' }}>* { barcodeImageErr.value }</p>
          }
        </div>

        <RaisedButton
          primary
          disabled={volumeErr.status || this.props. disableSave || this.props.loadingBrandList}
          label="Save"
          onClick={this.handleSave}
          style={{ marginTop: '40px' }}
        />
      </Fragment>
    )
  }
}

SkuDetailsForm.propTypes = {
  fetchGenreBasedBrandList: PropTypes.func,
  genres: PropTypes.number,
  action: PropTypes.string,
  loadingGenres: PropTypes.bool
}

export default SkuDetailsForm
