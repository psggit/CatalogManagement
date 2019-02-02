import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'
import { POST } from '@utils/fetch'
import { Api } from '@utils/config'
import {getIcon} from '@utils/icon-utils'
import { validateNumType, checkCtrlA, checkCtrlV } from './../../../utils'
import { validateTextField, validateEmail, validateNumberField } from './../../../utils/validators'
import RaisedButton from 'material-ui/RaisedButton'

class BrandForm extends React.Component {
  constructor(props) {
    super(props)
    this.uploadedImageUrl = ''
    //console.log("brand info", this.props.brandInfo, "props", this.props.brandTypeList)
    this.intitialState = {
      shouldTrim: true,
      brandName: props.brandInfo ? props.brandInfo.brand_name : '',
      alcoholPercentage: props.brandInfo ? this.props.brandInfo.alcohol_per : '',
      temperature: props.brandInfo ? this.props.brandInfo.temperature : '',
      caloriesPercentage: props.brandInfo ? this.props.brandInfo.cal_per : '',
      caloriesTotal: props.brandInfo ? props.brandInfo.cal_total : '',
      isImageUploaded: false,
      isImageUploading: false,
      isImageSelected: false,
      image_url: props.brandInfo ? props.brandInfo.image : '',
      high_res_image: props.brandInfo ? props.brandInfo.high_res_image : '',
      low_res_image: props.brandInfo ? props.brandInfo.low_res_image : '',
      high_res_brand_logo: props.brandInfo ? props.brandInfo.brand_logo_high_res_image : '',
      low_res_brand_logo: props.brandInfo ? props.brandInfo.brand_logo_low_res_image : '',
      typeIdx: props.brandInfo ? props.brandTypeList.map(item => parseInt(item.id)).indexOf(parseInt(props.brandInfo.type)) + 1 : 1,
      //brandType: props.brandInfo ? props.brandTypeList.map(item => item.id)[props.brandTypeList.map(item => item.id).indexOf(this.props.brandInfo.Type)] : props.brandTypeList.map(item => item.name)[0],
      //originIdx: props.brandInfo ? props.originList.map(item => item.short_name).indexOf(props.brandInfo.origin_name) + 1 : 1,
      //origin: props.brandInfo ? props.originList.map(item => item.short_name)[props.originList.map(item => item.short_name).indexOf(this.props.brandInfo.origin_name)] : props.originList.map(item => item.short_name)[0],
      description: props.brandInfo ? props.brandInfo.description : '',
      high_res_image_err: false,
      low_res_image_err: false,
      // high_res_brand_logo_err: false,
      // low_res_brand_logo_err: false,

      brandNameErr: {
        value: '',
        status: false
      },

      highResBrandLogoErr: {
        value: '',
        status: false
      },

      lowResBrandLogoErr: {
        value: '',
        status: false
      }
    }
    this.inputNameMap = {
      'brandName': 'Brand name',
      'lowResBrandLogo': 'Low res brand logo',
      'highResBrandLogo': 'High res brand logo'
    }

    //console.log("type id",props.brandTypeList,  props.brandInfo ? props.brandTypeList.map(item => item.id).indexOf(parseInt(props.brandInfo.type)) + 1 : 1)
    this.state = Object.assign({}, this.intitialState)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    //this.handleOriginChange = this.handleOriginChange.bind(this)
    this.handleUploadChange = this.handleUploadChange.bind(this)
    this.resetUploadImage = this.resetUploadImage.bind(this)
    this.submitUploadedImage = this.submitUploadedImage.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
  }
 
  componentDidUpdate (prevProps) {
    //if((this.props.originList !== prevProps.originList || this.props.brandTypeList !== prevProps.brandTypeList)) {
    if((this.props.brandTypeList !== prevProps.brandTypeList)) {
      this.setState({
        //originIdx: this.props.brandInfo ? this.props.originList.map(item => item.short_name).indexOf(this.props.brandInfo.origin_name) + 1 : 1,
        typeIdx: this.props.brandInfo ? this.props.brandTypeList.map(item => parseInt(item.id)).indexOf(parseInt(this.props.brandInfo.type)) + 1 : 1,
        //origin: this.props.brandInfo ? this.props.originList.map(item => item.short_name)[this.props.originList.map(item => item.short_name).indexOf(this.props.brandInfo.origin_name)] : this.props.originList.map(item => item.short_name)[0],
        //brandType: this.props.brandInfo ? this.props.brandTypeList.map(item => item.name)[this.props.brandTypeList.map(item => item.id).indexOf(this.props.brandInfo.Type)] : this.props.brandTypeList.map(item => item.name)[0]
      })
    }
  }

  handleTypeChange(e, k) {
    const typeIdx = k + 1
    this.setState({
      typeIdx,
      //brandType: this.props.brandTypeList[k].name
    })
  }

  // handleOriginChange(e, k) {
  //   const originIdx = k + 1
  //   this.setState({
  //     originIdx,
  //     origin: this.props.originList[k].short_name
  //   })
  // }

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
    // if(!/^(https:\/\/)(.*)/.test(value)) {
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

  handleChange(e) {
    const errName = `${e.target.name}Err`
    // if(validateNumType(e.keyCode) || checkCtrlA(e)) {
    //   this.setState({ 
    //     [e.target.name]: e.target.value
    //   })
    // } else {
    //   e.preventDefault()
    // }

    if(validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e)) {
      this.setState({ 
          [e.target.name]: e.target.value,
          [errName]: validateNumberField(this.inputNameMap[e.target.name], e.target.value)
      })
    } else {
        e.preventDefault()
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

  isFormValid() {
    const brandNameErr = validateTextField(this.inputNameMap['brandName'], this.state.brandName)
    this.setState({ brandNameErr: validateTextField(this.inputNameMap['brandName'], this.state.brandName) })

    const lowResBrandLogoErr = validateTextField(this.inputNameMap['lowResBrandLogo'], this.state.low_res_brand_logo)
    this.setState({ lowResBrandLogoErr: validateTextField(this.inputNameMap['lowResBrandLogo'], this.state.low_res_brand_logo) })

    const highResBrandLogoErr = validateTextField(this.inputNameMap['highResBrandLogo'], this.state.high_res_brand_logo)
    this.setState({ highResBrandLogoErr: validateTextField(this.inputNameMap['highResBrandLogo'], this.state.high_res_brand_logo) })
     
    if(!brandNameErr.status && !highResBrandLogoErr.status && !lowResBrandLogoErr.status) {
      return true;
    }
    return false
  }

  handleSave() {
    if(this.isFormValid()) {
      this.props.submit()
    }
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

  render() {
    const { brandNameErr } = this.state
    //console.log("state", this.state)
    return (
      <Fragment>
        
        <div className="form-group">
          <label className="label">Brand name</label><br />
          <TextField
            disabled={this.props.disableNameField}
            onChange={this.handleTextFields}
            name="brandName"
            value={this.state.brandName}
            style={{ width: '100%' }}
          />
          {
            brandNameErr.status &&
            <p className="error">* {brandNameErr.value}</p>
          }
        </div>

        {/* <div className="form-group">
          <label className="label">Origin</label><br />
          <SelectField
            value={this.state.originIdx}
            onChange={this.handleOriginChange}
            style={{ width: '100%' }}
          >
            {
              !this.props.loadingOriginList && this.props.originList.map((item, i) => (
                <MenuItem
                  value={i + 1}
                  key={item.id}
                  primaryText={item.name}
                />
              ))
            }
          </SelectField>
        </div> */}

        <div className="form-group">
          <label className="label">Alcohol percentage</label><br />
          <TextField
            //disabled={false}
            defaultValue={this.props.brandInfo ? this.props.brandInfo.alcohol_per : ''}
            name="alcoholPercentage"
            autoComplete='off'
            style={{ width: '100%' }}
            onKeyDown={(e) => { this.handleChange(e) }} 
            onKeyUp={(e) => { this.handleChange(e) }} 
          />
        </div>

        <div className="form-group">
          <label className="label">Temperature</label><br />
          <TextField
            //disabled={false}
            defaultValue={this.props.brandInfo ? this.props.brandInfo.temperature : ''}
            name="temperature"
            autoComplete='off'
            style={{ width: '100%' }}
            onKeyDown={(e) => { this.handleChange(e) }} 
            onKeyUp={(e) => { this.handleChange(e) }} 
          />
        </div>

        <div className="form-group">
          <label className="label">Calories percentage</label><br />
          <TextField
            //disabled={false}
            defaultValue={this.props.brandInfo ? this.props.brandInfo.cal_per : ''}
            name="caloriesPercentage"
            autoComplete='off'
            style={{ width: '100%' }}
            onKeyDown={(e) => { this.handleChange(e) }} 
            onKeyUp={(e) => { this.handleChange(e) }} 
          />
        </div>

        <div className="form-group">
          <label className="label">Calories total</label><br />
          <TextField
            //disabled={false}
            defaultValue={this.props.brandInfo ? this.props.brandInfo.cal_total : ''}
            name="caloriesTotal"
            autoComplete='off'
            style={{ width: '100%' }}
            onKeyDown={(e) => { this.handleChange(e) }} 
            onKeyUp={(e) => { this.handleChange(e) }} 
          />
        </div>

        <div className="form-group">
          <label className="label">Type</label><br />
          <SelectField
            value={this.state.typeIdx}
            onChange={this.handleTypeChange}
            style={{ width: '100%' }}
          >
            {
              !this.props.loadingBrandTypeList && this.props.brandTypeList.map((item, i) => (
                <MenuItem
                  value={i + 1}
                  key={i}
                  primaryText={item.name}
                />
              ))
            }
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
                { getIcon('cross-circle') }
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
          <label className="label">High res bottle image</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="high_res_image"
            autoComplete='off'
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.high_res_image}
            style={{ width: '100%' }}
          />
          {
            this.state.high_res_image_err && 
            <p style={{ color: '#ff3b34'}}> High res bottle image is required </p>
          }
          
        </div>

        <div className="form-group">
          <label className="label">Low res bottle image</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="low_res_image"
            autoComplete='off'
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.low_res_image}
            style={{ width: '100%' }}
          />
          {
            this.state.low_res_image_err && 
            <p style={{ color: '#ff3b34'}}> Low res bottle image is required</p>
          }
        </div>

        <div className="form-group">
          <label className="label">High res brand logo</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="high_res_brand_logo"
            autoComplete='off'
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.high_res_brand_logo}
            style={{ width: '100%' }}
          />
          {
            this.state.highResBrandLogoErr.status && 
            <p style={{ color: '#ff3b34'}}>{this.state.highResBrandLogoErr.value}</p>
          }
          
        </div>

        <div className="form-group">
          <label className="label">Low res brand logo</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="low_res_brand_logo"
            autoComplete='off'
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.low_res_brand_logo}
            style={{ width: '100%' }}
          />
          {
            this.state.lowResBrandLogoErr.status && 
            <p style={{ color: '#ff3b34'}}>{this.state.lowResBrandLogoErr.value}</p>
          }
        </div>

        <div className="form-group">
          <label className="label">Description</label>
          <br />
          <div style={{ paddingTop: '10px'}}>
            <textarea
              onChange={this.handleTextFields}
              name="description"
              value={this.state.description}
              style={{ width: '100%', fontSize: '16px' }}
              rows="4" 
            ></textarea>
          </div>
        </div>

        <RaisedButton
          primary
          disabled={brandNameErr.status || this.props.isDisabled}
          label="Save"
          onClick={this.handleSave}
          style={{ marginTop: '40px' }}
        />
      </Fragment>
    )
  }
}

export default BrandForm
