import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'
import { POST } from '@utils/fetch'
import { Api } from '@utils/config'
import {getIcon} from '@utils/icon-utils'
import { validateNumType, checkCtrlA } from './../../../utils'

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
      high_res_image: props.skuInfo ? props.skuInfo.high_res_image : '',
      low_res_image: props.skuInfo ? props.skuInfo.low_res_image : '',
      high_res_image_err: false,
      low_res_image_err: false
    }
    this.state = Object.assign({}, this.intitialState)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleBrandChange = this.handleBrandChange.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleUploadChange = this.handleUploadChange.bind(this)
    this.resetUploadImage = this.resetUploadImage.bind(this)
    this.submitUploadedImage = this.submitUploadedImage.bind(this)
  }

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
    this.setState({
      brandIdx,
      brandName: this.props.brandList[k].brand_name,
      brandId: this.props.brandList[k].brand_id
    })
  }

  handleChange(e) {
    if(validateNumType(e.keyCode) || checkCtrlA(e)) {
      this.setState({ 
        [e.target.name]: e.target.value
      })
    } else {
      e.preventDefault()
    }
  }

  handleTextFields(e) {
    let value = e.target.value
    if (this.state.shouldTrim) {
      value = value.trim()
    }

    if (value.trim().length) {
      this.setState({ shouldTrim: false })
    } else {
      this.setState({ shouldTrim: true })
    }
    this.setState({ [e.target.name]: value })
    if (!/^(https:\/\/)(.*)/.test(value)) {
      this.setState({ [`${e.target.name}_err`]: true })
    } else {
      this.setState({ [`${e.target.name}_err`]: false })
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
              >
                {
                  !this.props.loadingBrandList &&
                  this.props.brandList.map((item, i) => {
                    return <MenuItem
                      value={i + 1}
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
          <label className="label">Volume in ml</label><br />
          {
              <TextField
                disabled={this.props.isDisabled}
                defaultValue={this.props.skuInfo ? this.props.skuInfo.volume : ''}
                name="volume"
                autoComplete='off'
                style={{ width: '100%' }}
                onKeyDown={(e) => { this.handleChange(e) }} 
                onKeyUp={(e) => { this.handleChange(e) }} 
              />
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
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.high_res_image}
            style={{ width: '100%' }}
          />
          {
            this.state.high_res_image_err &&
            <p style={{ color: '#ff3b34' }}> High res image url is not valid </p>
          }
        </div>

        <div className="form-group">
          <label className="label">Low res image</label><br />
          <TextField
            onChange={this.handleTextFields}
            name="low_res_image"
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.low_res_image}
            style={{ width: '100%' }}
          />
          {
            this.state.low_res_image_err &&
            <p style={{ color: '#ff3b34' }}> Low res image url is not valid </p>
          }
        </div>

        {/* {
          this.props.action === "edit" && this.state.status === 2 &&
          <div className="form-group">
            <Checkbox
              disabled={this.props.isDisabled}
              checked={this.state.cancelOpenReservation}
              onCheck={this.handleCheckboxes}
              name="cancelOpenReservation"
              label="is_closed_for_reservation"
            />
          </div>
        } */}

      </Fragment>
    )
  }
}

export default SkuDetailsForm