import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'
import { POST } from '@utils/fetch'
import { Api } from '@utils/config'
import {getIcon} from '@utils/icon-utils'
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
      //status: props.skuInfo ? props.skuInfo.is_active : '',
      shouldTrim: true,
      //cancelOpenReservation: false,
      brandIdx: 0,
      brandName: props.brandName ? props.brandName : '',
      brandId: 0,
      isImageUploaded: false,
      isImageUploading: false,
      isImageSelected: false,
      image_url: props.skuInfo ? props.skuInfo.image_url : '',
      tag:  props.skuInfo ? props.skuInfo.tag : '',
      high_res_image: props.skuInfo ? props.skuInfo.high_res_image : '',
      low_res_image: props.skuInfo ? props.skuInfo.low_res_image : '',
      barcode_image: props.skuInfo ? props.skuInfo.barcode_image : '',
      gs1_barcode: props.skuInfo ? props.skuInfo.gs1_barcode : '', 
      high_res_image_err: false,
      low_res_image_err: false,
      //gs1_barcode_err: false,
      //barcode_image_err: false,
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
      'tagName': 'Tag'
    }
    
    this.state = Object.assign({}, this.intitialState)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleBrandChange = this.handleBrandChange.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleUploadChange = this.handleUploadChange.bind(this)
    this.resetUploadImage = this.resetUploadImage.bind(this)
    this.submitUploadedImage = this.submitUploadedImage.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
  }

  // componentDidMount() {
  //   this.props.actions.setLoadingState()
  // }

  handleStatusChange(e, k) {
    //const { statusData } = this.props
    const statusIdx = k + 1
    console.log(statusIdx)
    this.setState({
      statusIdx
    })
  }

  handleBrandChange(e, k) {
    const brandIdx = k + 1
    console.log("id", brandIdx, "name", this.props.brandList[k].id, this.props.brandList[k])
    this.setState({
      brandIdx,
      //brandName: this.props.brandList[k].brand_name,
      brandId: this.props.brandList[k].id
    })
  }

  handleChange(e) {
    // if(validateNumType(e.keyCode) || checkCtrlA(e)) {
    //   this.setState({ 
    //     [e.target.name]: e.target.value
    //   })
    // } else {
    //   e.preventDefault()
    // }
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

  handleTextFields(e) {
    // let value = e.target.value
    // if (this.state.shouldTrim) {
    //   value = value.trim()
    // }

    // if (value.trim().length) {
    //   this.setState({ shouldTrim: false })
    // } else {
    //   this.setState({ shouldTrim: true })
    // }
    // this.setState({ [e.target.name]: value })
    // if (!/^(https:\/\/)(.*)/.test(value)) {
    //   this.setState({ [`${e.target.name}_err`]: true })
    // } else {
    //   this.setState({ [`${e.target.name}_err`]: false })
    // }
    const errName = `${e.target.name}Err`
    this.setState({
        [e.target.name]: e.target.value,
        [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
    })
  }

  isFormValid() {
    const volumeErr = validateNumberField(this.inputNameMap['volume'], this.state.volume)
    this.setState({ volumeErr: validateNumberField(this.inputNameMap['volume'], this.state.volume) })

    const gs1BarcodeErr = validateTextField(this.inputNameMap['gs1Barcode'], this.state.gs1_barcode)
    this.setState({ gs1BarcodeErr: validateTextField(this.inputNameMap['gs1Barcode'], this.state.gs1_barcode) })

    const barcodeImageErr = validateTextField(this.inputNameMap['barcodeImage'], this.state.barcode_image)
    this.setState({ barcodeImageErr: validateTextField(this.inputNameMap['barcodeImage'], this.state.barcode_image) })

    // const tagNameErr = validateTextField(this.inputNameMap['tagName'], this.state.tag)
    // this.setState({ tagNameErr: validateTextField(this.inputNameMap['tagName'], this.state.tag) })

    if(!volumeErr.status && !gs1BarcodeErr.status && !barcodeImageErr.status) {
      return true;
    }
    return false
  }

  handleSave() {
    if(this.isFormValid()) {
      this.props.submit()
    }
  }
  getData() {
    return this.state
  }

  handleUploadChange(e) {
    const file = e.target.files[0]
    this.setState({
      data: file,
      isImageSelected: true
    })
  }

  resetUploadImage() {
    this.setState({ isImageUploaded: false, isImageSelected: false, isImageUploading: false, image_url: '' })
  }

  submitUploadedImage() {
    const formData = new FormData()
    formData.append('file', this.state.data)
    this.setState({ isImageUploading: true, isImageSelected: false })
    POST({
      api: '/upload',
      type: 'FormData',
      apiBase: 'api2',
      data: formData,
      handleError: true
    })
      .then((json) => {
        this.uploadedImageUrl = `${Api.api2}/get?fs_url=${json[0]}`
        this.setState({ isImageUploaded: true, isImageUploading: false, image_url: json[0] })
      })
  }

  handleCheckboxes(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  render() {
    //console.log("props", this.props)
    const {volumeErr, tagNameErr, gs1BarcodeErr, barcodeImageErr} = this.state
    return (
      <Fragment>

        <div className="form-group">
          <label className="label">Brand name</label><br />
          {
            this.props.action !== "edit" ?
              <SelectField
                value={this.state.brandIdx}
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
                      value={i+1}
                      key={i}
                      primaryText={item.brand_name}
                    />
                  })
                }
              </SelectField>
              :
              <TextField
                disabled={this.props.isDisabled}
                onChange={this.handleTextFields}
                name="brandName"
                value={this.props.brandName}
                style={{ width: '100%' }}
              />
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
          <label className="label">Tag*</label><br />
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
          <label className="label">Upload image</label><br />
          {
            !this.state.isImageUploaded &&
            <div>
              <input
                onChange={this.handleUploadChange}
                type="file"
                style={{
                  marginTop: '15px',
                  padding: '0',
                  border: '0'
                }}
              />

              <button
                disabled={!this.state.isImageSelected || this.state.isImageUploading}
                onClick={this.submitUploadedImage}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: this.state.isImageUploading ? 'progress' : 'pointer'
                }}
              >
                Upload
              </button>
            </div>
          }
          {
            this.state.isImageUploaded &&
            <div style={{
              width: '200px',
              marginTop: '15px',
              position: 'relative',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <img src={this.uploadedImageUrl} style={{ width: '200px', height: '200px' }} />
              <div
                onClick={this.resetUploadImage}
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  zIndex: '1',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#fff',
                  cursor: 'pointer'
                }}>
                {getIcon('cross-circle')}
              </div>
            </div>
          }
        </div>

        <div className="form-group">
          <label className="label">Image url</label><br />
          <TextField
            readOnly
            onChange={this.handleTextFields}
            name="high_res_image"
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.image_url}
            style={{ width: '100%' }}
          />
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
          <label className="label">Gs1 barcode*</label><br />
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
          <label className="label">Barcode image*</label><br />
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
          disabled={volumeErr.status || this.props. disableSave}
          label="Save"
          onClick={this.handleSave}
          style={{ marginTop: '40px' }}
        />
      </Fragment>
    )
  }
}

export default SkuDetailsForm
